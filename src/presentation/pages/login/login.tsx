import React, { FormEvent, ReactElement, useEffect, useState } from 'react'

import LoginHeader from '@/presentation/components/header/login-header'
import Styles from './login-styles.scss'
import { Footer } from '@/presentation/components/footer/footer'
import { Input } from '@/presentation/components/input/input'
import { FormStatus } from '@/presentation/components/formStatus/form-status'
import { Context } from '@/presentation/contexts/form-context'
import { Validation } from '@/presentation/protocols/validation'
import { Authentication } from '@/domain/use-cases'

type Props = {
  validation?: Validation
  authentication?: Authentication
}

function Login (props: Props): ReactElement {
  const [state, setState] = useState({
    isLoading: false,
    email: '',
    password: '',
    formErrors: {
      email: '',
      password: '',
      all: ''
    }
  })

  const updateFormError = (field: string, message: string): void => {
    setState(prev => ({
      ...prev,
      formErrors: {
        ...prev.formErrors,
        [field]: message
      }
    }))
  }

  useEffect(() => {
    updateFormError('email', props.validation.validate('email', state.email))
  }, [state.email])

  useEffect(() => {
    updateFormError('password', props.validation.validate('password', state.password))
  }, [state.password])

  const handleSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault()
    if (state.isLoading) return
    if (state.formErrors.email || state.formErrors.password) return
    setState(prev => ({
      ...prev,
      isLoading: true
    }))
    try {
      const account = await props.authentication.auth({ email: state.email, password: state.password })
      localStorage.setItem('accessToken', account.accessToken)
    } catch (err) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        formErrors: {
          ...prev.formErrors,
          all: err.message
        }
      }))
    }
  }

  return (
      <div className={Styles.login}>
          <LoginHeader />
          <Context.Provider value={{ state, setState }}>
            <form data-testid="form" onSubmit={handleSubmit} className={Styles.form}>
              <h2>Login</h2>
              <Input type="email" name="email" placeholder="Digite seu e-mail" />
              <Input type="password" name="password" placeholder="Digite sua senha"/>
              <button
                data-testid="submit"
                type="submit"
                disabled={!!state.formErrors.email || !!state.formErrors.password}>
                  Enviar
              </button>
              <span className={Styles.link}>Criar conta</span>
              <FormStatus />
            </form>
          </Context.Provider>
          <Footer />
      </div>
  )
}

export default Login
