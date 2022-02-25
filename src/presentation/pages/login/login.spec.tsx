import React from 'react'
import { cleanup, fireEvent, render, RenderResult } from '@testing-library/react'
import { Login } from '..'
import { Validation } from '@/presentation/protocols/validation'

class ValidationSpy implements Validation {
  errorMessage: string
  fieldName: string
  fieldValue: string

  validate (fieldName: string, fieldValue: string): string {
    this.fieldValue = fieldValue
    this.fieldName = fieldName
    return this.errorMessage
  }
}

type SutTypes = {
  sut: RenderResult
  validationSpy: Validation
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const sut = render(<Login validation={validationSpy}/>)

  return {
    sut,
    validationSpy
  }
}

describe('Login Page', () => {
  beforeEach(() => {
    cleanup()
  })

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

  test('Should call validation with correct email', () => {
    const { sut, validationSpy } = makeSut()

    const emailInput = sut.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: 'any_email' } })

    expect(validationSpy.fieldName).toEqual('email')
    expect(validationSpy.fieldValue).toEqual('any_email')
  })

  test('Should call validation with correct password', () => {
    const { sut, validationSpy } = makeSut()

    const passwordInput = sut.getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: 'any_password' } })

    expect(validationSpy.fieldName).toEqual('password')
    expect(validationSpy.fieldValue).toEqual('any_password')
  })
})
