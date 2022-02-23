import React, { ReactElement } from 'react'
import { Spinner } from '../../components/spinner/spinner'
import { LogoIcon } from '../../components/icons/logo'
import Styles from './login-styles.scss'

export function Login (): ReactElement {
  return (
      <div className={Styles.login}>
          <header className={Styles.header}>
              <LogoIcon />
              <h1>4Dev - Enquetes para Programadores</h1>
          </header>
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
          <footer className={Styles.footer}></footer>
      </div>
  )
}
