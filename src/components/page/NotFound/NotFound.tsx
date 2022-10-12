import React from 'react'
import cx from 'classnames'

import styles from './NotFound.module.css'

type Props = {
  className?: string
}

export const NotFound = ({ className }: Props) => (
  <div className={cx(styles.notFound, className)}>Not Found</div>
)
