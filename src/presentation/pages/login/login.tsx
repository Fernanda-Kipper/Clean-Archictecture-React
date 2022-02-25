import React, { ReactElement, useEffect, useState } from 'react'

import LoginHeader from '@/presentation/components/header/login-header'
import Styles from './login-styles.scss'
import { Footer } from '@/presentation/components/footer/footer'
import { Input } from '@/presentation/components/input/input'
import { FormStatus } from '@/presentation/components/formStatus/form-status'
import { Context } from '@/presentation/contexts/form-context'
import { Validation } from '@/presentation/protocols/validation'

type Props = {
  validation?: Validation
}

function Login (props: Props): ReactElement {
  const [state, setState] = useState({
    isLoading: false,
    email: '',
    password: '',
    formErrors: {
      email: 'Campo obrigatório',
      password: 'Campo obrigatório',
      all: ''
    }
  })

  useEffect(() => {
    props.validation.validate({ email: state.email })
  }, [state.email])

  return (
      <div className={Styles.login}>
          <LoginHeader />
          <Context.Provider value={{ state, setState }}>
            <form className={Styles.form}>
              <h2>Login</h2>
              <Input type="email" name="email" placeholder="Digite seu e-mail" />
              <Input type="password" name="password" placeholder="Digite sua senha"/>
              <button data-testid="submit" type="submit" disabled>Enviar</button>
              <span className={Styles.link}>Criar conta</span>
              <FormStatus />
            </form>
          </Context.Provider>
          <Footer />
      </div>
  )
}

export default Login
