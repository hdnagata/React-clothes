import React from 'react'
import cx from 'classnames'

import styles from './About.module.css'

type Props = {
  className?: string
}

export const About = ({ className }: Props) => (
  <div className={cx(styles.about, className)}>About</div>
)
