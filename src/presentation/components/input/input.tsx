import { Context } from '@/presentation/contexts/form-context'
import React, { InputHTMLAttributes, ReactElement, useContext } from 'react'
import Styles from './input-styles.scss'

type Props = InputHTMLAttributes<HTMLInputElement>

export function Input (props: Props): ReactElement {
  const { formErrors } = useContext(Context)
  const error = formErrors[props.name]

  const getCurrentStatus = (): string => {
    return '🔴'
  }

  return (
    <div className={Styles.inputWrapper}>
        <input {...props}/>
        <span
          data-testid={`${props.name}-status`}
          title={error}
          className={Styles.inputStatus}>
            {getCurrentStatus()}
        </span>
    </div>
  )
}

export default Input
