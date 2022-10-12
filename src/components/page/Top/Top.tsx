import React from 'react'
import cx from 'classnames'

import styles from './Top.module.css'

type Props = {
  className?: string
}

export const Top = ({ className }: Props) => (
  <div className={cx(styles.top, className)}>
    <header>
      <h1 className={styles.title}>Top</h1>
    </header>
  </div>
)
