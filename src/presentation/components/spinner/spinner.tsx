import React, { HTMLAttributes, ReactElement } from 'react'
import Styles from './spinner-styles.scss'

type Props = HTMLAttributes<HTMLElement>

export function Spinner (props: Props): ReactElement {
  return (
    <div {...props} className={[Styles.spinner, props.className].join(' ')}></div>
  )
}
