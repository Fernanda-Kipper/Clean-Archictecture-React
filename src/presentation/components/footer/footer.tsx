import React, { memo, ReactElement } from 'react'
import Styles from './footer-styles.scss'

export function Footer (): ReactElement {
  return <footer className={Styles.footer}></footer>
}

export default memo(Footer)
