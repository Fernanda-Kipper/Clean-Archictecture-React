import React, { ReactElement } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login } from '.'

import '../styles/global.scss'

function Router (): ReactElement {
  return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login/ >}/>
            </Routes>
        </BrowserRouter>
  )
}

export default Router
