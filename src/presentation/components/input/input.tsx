import React, { InputHTMLAttributes, ReactElement } from 'react'
import Styles from './input-styles.scss'

type Props = InputHTMLAttributes<HTMLInputElement>

export function Input (props: Props): ReactElement {
  return (
    <div className={Styles.inputWrapper}>
        <input {...props}/>
        <span className={Styles.inputStatus}>🔴</span>
    </div>
  )
}

export default Input
