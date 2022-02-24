import React, { ReactElement, useState } from 'react'

import LoginHeader from '@/presentation/components/header/login-header'
import Styles from './login-styles.scss'
import { Footer } from '@/presentation/components/footer/footer'
import { Input } from '@/presentation/components/input/input'
import { FormStatus } from '@/presentation/components/formStatus/form-status'
import { Context } from '@/presentation/contexts/form-context'

type StateProps = {
  isLoading: boolean
  errorMessage: string
}

function Login (): ReactElement {
  const [state] = useState<StateProps>({
    isLoading: false,
    errorMessage: ''
  })

  return (
      <div className={Styles.login}>
          <LoginHeader />
          <Context.Provider value={state}>
            <form className={Styles.form}>
              <h2>Login</h2>
              <Input type="email" name="email" placeholder="Digite seu e-mail"/>
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
