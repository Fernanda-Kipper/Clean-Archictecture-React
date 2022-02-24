import React from 'react'
import { render } from '@testing-library/react'
import { Login } from '..'

describe('Login Page', () => {
  test('Should initial render should be  correct initial state', () => {
    const { getByTestId } = render(<Login />)

    const emailStatus = getByTestId('email-status')
    const passwordStatus = getByTestId('email-status')

    expect(getByTestId('error-wrapper').childElementCount).toBe(0)
    expect((getByTestId('submit') as HTMLButtonElement).disabled).toBe(true)
    expect(emailStatus.title).toBe('Campo obrigatório')
    expect(emailStatus.textContent).toBe('🔴')
    expect(passwordStatus.title).toBe('Campo obrigatório')
    expect(passwordStatus.textContent).toBe('🔴')
  })
})
