import React from 'react'
import { render, RenderResult } from '@testing-library/react'
import { Login } from '..'

type SutTypes = {
  sut: RenderResult
}

const makeSut = (): SutTypes => {
  const sut = render(<Login />)

  return {
    sut
  }
}

describe('Login Page', () => {
  test('Should initial render should be  correct initial state', () => {
    const { sut } = makeSut()

    const emailStatus = sut.getByTestId('email-status')
    const passwordStatus = sut.getByTestId('email-status')

    expect(sut.getByTestId('error-wrapper').childElementCount).toBe(0)
    expect((sut.getByTestId('submit') as HTMLButtonElement).disabled).toBe(true)
    expect(emailStatus.title).toBe('Campo obrigatório')
    expect(emailStatus.textContent).toBe('🔴')
    expect(passwordStatus.title).toBe('Campo obrigatório')
    expect(passwordStatus.textContent).toBe('🔴')
  })
})
