import { Context } from '@/presentation/contexts/form-context'
import React, { ReactElement, useContext } from 'react'
import { Spinner } from '../spinner/spinner'
import Styles from './form-status-styles.scss'

export function FormStatus (): ReactElement {
  const { isLoading, errorMessage } = useContext(Context)
  return (
    <div className={Styles.errorWrapper} data-testid="error-wrapper">
        {isLoading && <Spinner />}
        {errorMessage ?? <span className={Styles.error}>{errorMessage}</span>}
    </div>
  )
}
