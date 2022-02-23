import React, { ReactElement } from 'react'

import { Spinner } from '../../components/spinner/spinner'
import LoginHeader from '@/presentation/components/header/login-header'
import Styles from './login-styles.scss'
import { Footer } from '@/presentation/components/footer/footer'

export function Login (): ReactElement {
  return (
      <div className={Styles.login}>
          <LoginHeader />
          <form className={Styles.form}>
            <h2>Login</h2>
            <div className={Styles.inputWrapper}>
              <input type="email" name="email" placeholder="Digite seu e-mail"/>
              <span className={Styles.inputStatus}>🔴</span>
            </div>
            <div className={Styles.inputWrapper}>
              <input type="password" name="password" placeholder="Digite sua senha"/>
              <span className={Styles.inputStatus}>🔴</span>
            </div>
            <button type="submit">Enviar</button>
            <span className={Styles.link}>Criar conta</span>
            <div className={Styles.errorWrapper}>
              <Spinner/>
              <span className={Styles.error}>Erro</span>
            </div>
          </form>
          <Footer />
      </div>
  )
}
