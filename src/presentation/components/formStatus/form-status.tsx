import { Context } from '@/presentation/contexts/form-context'
import React, { ReactElement, useContext } from 'react'
import { Spinner } from '../spinner/spinner'
import Styles from './form-status-styles.scss'

export function FormStatus (): ReactElement {
  const { state } = useContext(Context)
  const { isLoading, formErrors } = state

  return (
    <div className={Styles.errorWrapper} data-testid="error-wrapper">
        {isLoading && <Spinner />}
        {formErrors?.all ?? <p data-testid="main-error" className={Styles.error}>{formErrors.all}</p>}
    </div>
  )
}
