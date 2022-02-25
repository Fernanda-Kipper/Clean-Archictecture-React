import { Context } from '@/presentation/contexts/form-context'
import React, { FocusEvent, InputHTMLAttributes, ReactElement, useContext } from 'react'
import Styles from './input-styles.scss'

type Props = InputHTMLAttributes<HTMLInputElement>

export function Input (props: Props): ReactElement {
  const { state, setState } = useContext(Context)
  const { formErrors } = state
  const error = formErrors[props.name]

  const getCurrentStatus = (): string => {
    return '🔴'
  }

  const updateValue = (event: FocusEvent<HTMLInputElement>): void => {
    setState(prev => ({
      ...prev,
      [event.target.name]: event.target.value
    }))
  }

  return (
    <div className={Styles.inputWrapper}>
        <input {...props} data-testid={props.name} onChange={updateValue}/>
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
