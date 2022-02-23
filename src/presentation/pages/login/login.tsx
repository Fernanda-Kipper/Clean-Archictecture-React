import React, { ReactElement } from 'react'

import LoginHeader from '@/presentation/components/header/login-header'
import Styles from './login-styles.scss'
import { Footer } from '@/presentation/components/footer/footer'
import { Input } from '@/presentation/components/input/input'
import { FormStatus } from '@/presentation/components/formStatus/form-status'

export function Login (): ReactElement {
  return (
      <div className={Styles.login}>
          <LoginHeader />
          <form className={Styles.form}>
            <h2>Login</h2>
            <Input type="email" name="email" placeholder="Digite seu e-mail"/>
            <Input type="password" name="password" placeholder="Digite sua senha"/>
            <button type="submit">Enviar</button>
            <span className={Styles.link}>Criar conta</span>
            <FormStatus isLoading error="Erro inesperado"/>
          </form>
          <Footer />
      </div>
  )
}
