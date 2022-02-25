import React from 'react'
import { cleanup, fireEvent, render, RenderResult } from '@testing-library/react'
import { Login } from '..'
import { ValidationSpy } from '@/presentation/test/mock-validation'
import faker from 'faker'

type SutTypes = {
  sut: RenderResult
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  validationSpy.errorMessage = faker.random.words()
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
    const { sut, validationSpy } = makeSut()

    const emailStatus = sut.getByTestId('email-status')
    const passwordStatus = sut.getByTestId('email-status')

    expect(sut.getByTestId('error-wrapper').childElementCount).toBe(0)
    expect((sut.getByTestId('submit') as HTMLButtonElement).disabled).toBe(true)
    expect(emailStatus.title).toBe(validationSpy.errorMessage)
    expect(emailStatus.textContent).toBe('🔴')
    expect(passwordStatus.title).toBe(validationSpy.errorMessage)
    expect(passwordStatus.textContent).toBe('🔴')
  })

  test('Should call validation with correct email', () => {
    const { sut, validationSpy } = makeSut()
    const email = faker.internet.email()

    const emailInput = sut.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: email } })

    expect(validationSpy.fieldName).toEqual('email')
    expect(validationSpy.fieldValue).toEqual(email)
  })

  test('Should call validation with correct password', () => {
    const { sut, validationSpy } = makeSut()
    const password = faker.internet.email()

    const passwordInput = sut.getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: password } })

    expect(validationSpy.fieldName).toEqual('password')
    expect(validationSpy.fieldValue).toEqual(password)
  })

  test('Should show email error if validation fails', () => {
    const { sut, validationSpy } = makeSut()
    const email = faker.internet.email()

    const emailInput = sut.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: email } })
    const emailStatus = sut.getByTestId('email-status')

    expect(emailStatus.title).toBe(validationSpy.errorMessage)
    expect(emailStatus.textContent).toBe('🔴')
  })

  test('Should show password error if validation fails', () => {
    const { sut, validationSpy } = makeSut()
    const password = faker.internet.password()

    const passwordInput = sut.getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: password } })
    const passwordStatus = sut.getByTestId('password-status')

    expect(passwordStatus.title).toBe(validationSpy.errorMessage)
    expect(passwordStatus.textContent).toBe('🔴')
  })

  test('Should show valid password state if validation succeed', () => {
    const { sut, validationSpy } = makeSut()
    const password = faker.internet.password()
    validationSpy.errorMessage = null

    const passwordInput = sut.getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: password } })
    const passwordStatus = sut.getByTestId('password-status')

    expect(passwordStatus.title).toBe('Tudo certo!')
    expect(passwordStatus.textContent).toBe('🟢')
  })

  test('Should show valid email state if validation succeed', () => {
    const { sut, validationSpy } = makeSut()
    const email = faker.internet.email()
    validationSpy.errorMessage = null

    const emailInput = sut.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: email } })
    const emailStatus = sut.getByTestId('email-status')

    expect(emailStatus.title).toBe('Tudo certo!')
    expect(emailStatus.textContent).toBe('🟢')
  })

  test('Should enable submit button if form is valid', () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.errorMessage = null

    const emailInput = sut.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
    const passwordInput = sut.getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })

    expect((sut.getByTestId('submit') as HTMLButtonElement).disabled).toBe(false)
  })
})
