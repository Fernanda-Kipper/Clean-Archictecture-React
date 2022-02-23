import React, { memo, ReactElement } from 'react'
import { LogoIcon } from '../icons/logo'
import Styles from './login-header-styles.scss'

export function LoginHeader (): ReactElement {
  return (
        <header className={Styles.header}>
            <LogoIcon />
            <h1>4Dev - Enquetes para Programadores</h1>
        </header>
  )
}

export default memo(LoginHeader)
