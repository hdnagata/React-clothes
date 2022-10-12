#!/usr/bin/env node

/* eslint-disable */
const fs = require('fs')
const path = require('path')
const minimist = require('minimist')
/* eslint-enable */

const argv = minimist(process.argv.slice(2), {
  alias: {
    o: 'output',
    p: 'parent',
    h: 'help',
  },
  default: {
    parent: null,
    output: 'ui',
  },
})

const { output, parent, help } = argv
const name = argv._[0]
const outputDir = `components/${output}/${parent || name}`

if (help || !name) {
  // eslint-disable-next-line no-console
  console.log(`usage: ${path.basename(process.argv[1])} [options] <name>
  -o, --output: Output directory (default: ui)
  -p, --parent: Parent directory (optional)
`)
  process.exit(0)
}

const createDir = dir => {
  try {
    fs.mkdirSync(dir)
  } catch (e) {
    fs.mkdirSync(dir.replace(/\/[^/]+$/, ''))
    fs.mkdirSync(dir)
  }
}

const toLowerCamel = str => {
  return str[0].toLowerCase() + str.replace(/^./, '')
}

const indexTemplate = `
export * from './${name}'
`

const componentTemplate = `
import React from 'react'
import cx from 'classnames'

import styles from './${name}.module.css'

type Props = {
  children?: React.ReactNode
  className?: string
}

export const ${name} = ({ children, className }: Props) => (
  <div className={cx(styles.${toLowerCamel(name)}, className)}>
    {children}
  </div>
)
`

const cssTemplate = `.${toLowerCamel(name)} {
  /* TBD */
}
`

const storiesTemplate = `
import React from 'react'
import { storiesOf } from '@storybook/react'

/* eslint-disable @typescript-eslint/no-unused-vars */
import { action } from '@storybook/addon-actions'
/* eslint-enable @typescript-eslint/no-unused-vars */

import { ${name} } from './${name}'

storiesOf('${output === 'page' ? output : `${output}/${name}`}', module)
  .add('${
    output === 'page' ? name : 'default'
  }', () => <${name}>The first story for the ${name} component!</${name}>)
`

// ============================================================================

const dir = `${__dirname}/../src/${outputDir}`

if (!parent) {
  createDir(dir)
  fs.writeFileSync(`${dir}/${name}.stories.tsx`, storiesTemplate)
  fs.writeFileSync(`${dir}/index.ts`, indexTemplate)
}

fs.writeFileSync(`${dir}/${name}.tsx`, componentTemplate)
fs.writeFileSync(`${dir}/${name}.module.css`, cssTemplate)
