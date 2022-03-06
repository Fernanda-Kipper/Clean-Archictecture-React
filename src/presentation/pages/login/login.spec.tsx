import React from 'react'
import 'jest-localstorage-mock'
import { act, cleanup, fireEvent, render, RenderResult, waitFor } from '@testing-library/react'
import { Login } from '..'
import { ValidationSpy } from '@/presentation/test/mock-validation'
import faker from 'faker'
import { AuthenticationSpy } from '@/presentation/test/mock-authentication'
import { InvalidCredentialsError } from '@/domain/errors'
import { BrowserRouter } from 'react-router-dom'

type SutTypes = {
  sut: RenderResult
  validationSpy: ValidationSpy
  authenticationSpy: AuthenticationSpy
}

type SutParams = {
  validationError?: string
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationSpy = new ValidationSpy()
  const authenticationSpy = new AuthenticationSpy()
  validationSpy.errorMessage = params?.validationError
  const sut = render(
    <BrowserRouter>
      <Login validation={validationSpy} authentication={authenticationSpy} />
    </BrowserRouter>
  )

  return {
    sut,
    validationSpy,
    authenticationSpy
  }
}

const simulateValidSubmit = (sut: RenderResult, email = faker.internet.email(), password = faker.internet.password()): void => {
  populateEmailField(sut, email)
  populatePasswordField(sut, password)
  fireEvent.submit(sut.getByTestId('submit'))
}

const populateEmailField = (sut: RenderResult, email = faker.internet.email()): void => {
  const emailInput = sut.getByTestId('email')
  fireEvent.input(emailInput, { target: { value: email } })
}

const populatePasswordField = (sut: RenderResult, password = faker.internet.password()): void => {
  const passwordInput = sut.getByTestId('password')
  fireEvent.input(passwordInput, { target: { value: password } })
}

const assertFieldStatus = (sut: RenderResult, fieldName: string, validationError?: string): void => {
  const fieldStatus = sut.getByTestId(`${fieldName}-status`)
  expect(fieldStatus.title).toBe(validationError || 'Tudo certo!')
  expect(fieldStatus.textContent).toBe(validationError ? '🔴' : '🟢')
}

describe('Login Page', () => {
  beforeEach(() => {
    cleanup()
    localStorage.clear()
  })

  test('Should initial render should be  correct initial state', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })

    expect(sut.getByTestId('error-wrapper').childElementCount).toBe(0)
    expect((sut.getByTestId('submit') as HTMLButtonElement).disabled).toBe(true)
    assertFieldStatus(sut, 'email', validationError)
    assertFieldStatus(sut, 'password', validationError)
  })

  test('Should call validation with correct email', () => {
    const validationError = faker.random.words()
    const { sut, validationSpy } = makeSut({ validationError })
    const email = faker.internet.email()

    populateEmailField(sut, email)

    expect(validationSpy.fieldName).toEqual('email')
    expect(validationSpy.fieldValue).toEqual(email)
  })

  test('Should call validation with correct password', () => {
    const validationError = faker.random.words()
    const { sut, validationSpy } = makeSut({ validationError })
    const password = faker.internet.email()

    populatePasswordField(sut, password)

    expect(validationSpy.fieldName).toEqual('password')
    expect(validationSpy.fieldValue).toEqual(password)
  })

  test('Should show email error if validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    const email = faker.internet.email()

    populateEmailField(sut, email)

    assertFieldStatus(sut, 'email', validationError)
  })

  test('Should show password error if validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    const password = faker.internet.password()

    populatePasswordField(sut, password)

    assertFieldStatus(sut, 'password', validationError)
  })

  test('Should show valid password state if validation succeed', () => {
    const { sut } = makeSut()
    const password = faker.internet.password()

    populatePasswordField(sut, password)

    assertFieldStatus(sut, 'password')
  })

  test('Should show valid email state if validation succeed', () => {
    const { sut } = makeSut()
    const email = faker.internet.email()

    populateEmailField(sut, email)

    assertFieldStatus(sut, 'email')
  })

  test('Should enable submit button if form is valid', () => {
    const { sut } = makeSut()

    populateEmailField(sut)
    populatePasswordField(sut)

    expect((sut.getByTestId('submit') as HTMLButtonElement).disabled).toBe(false)
  })

  test('Should show loading spinner on submit', () => {
    const { sut } = makeSut()

    simulateValidSubmit(sut)

    const spinner = sut.getByTestId('spinner')
    expect(spinner).toBeTruthy()
  })

  test('Should call authentication with correct values', () => {
    const { sut, authenticationSpy } = makeSut()
    const email = faker.internet.email()
    const password = faker.internet.email()

    simulateValidSubmit(sut, email, password)

    expect(authenticationSpy.params).toEqual({ email, password })
  })

  test('Should call authentication with correct values', () => {
    const { sut, authenticationSpy } = makeSut()
    const email = faker.internet.email()
    const password = faker.internet.email()

    simulateValidSubmit(sut, email, password)

    expect(authenticationSpy.params).toEqual({ email, password })
  })

  test('Should call authentication only once', () => {
    const { sut, authenticationSpy } = makeSut()
    const email = faker.internet.email()
    const password = faker.internet.email()

    simulateValidSubmit(sut, email, password)
    simulateValidSubmit(sut, email, password)

    expect(authenticationSpy.callsCount).toBe(1)
  })

  test('Should not call authentication if form is invalid', () => {
    const validationError = faker.random.words()
    const { sut, authenticationSpy } = makeSut({ validationError })
    const email = faker.internet.email()

    populateEmailField(sut, email)
    fireEvent.submit(sut.getByTestId('form'))

    expect(authenticationSpy.callsCount).toBe(0)
  })

  test('Should present error if authentication fails', async () => {
    const { sut, authenticationSpy } = makeSut()
    const email = faker.internet.email()
    const password = faker.internet.password()
    const authenticationError = new InvalidCredentialsError()
    jest.spyOn(authenticationSpy, 'auth').mockReturnValueOnce(Promise.reject(authenticationError))

    simulateValidSubmit(sut, email, password)

    const errorWrapper = sut.getByTestId('error-wrapper')
    await waitFor(() => expect(errorWrapper.childElementCount).toBe(1))
    expect(errorWrapper.textContent).toBe(authenticationError.message)
  })

  test('Should add accessToken on localStorage on success', async () => {
    const { sut, authenticationSpy } = makeSut()

    act(() => simulateValidSubmit(sut))

    await waitFor(() => sut.getByTestId('form'))
    expect(localStorage.setItem).toBeCalledWith('accessToken', authenticationSpy.account.accessToken)
  })

  test('Should go to sign up page', async () => {
    const { sut } = makeSut()
    const signUpButton = sut.getByTestId('sign-up')

    fireEvent.click(signUpButton)

    expect(window.location.pathname).toBe('/sign-up')
  })
})
