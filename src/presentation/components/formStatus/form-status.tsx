import React, { ReactElement } from 'react'
import { Spinner } from '../spinner/spinner'
import Styles from './form-status-styles.scss'

type Props = {
  isLoading?: boolean
  error?: string
}

export function FormStatus (props: Props): ReactElement {
  return (
    <div className={Styles.errorWrapper}>
        {props.isLoading ? <Spinner /> : <></>}
        {props.error ?? <span className={Styles.error}>{props.error}</span>}
    </div>
  )
}
