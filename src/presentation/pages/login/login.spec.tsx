import React from 'react'
import { render } from '@testing-library/react'
import { Login } from '..'

describe('Login Page', () => {
  test('Should not render spinner and error on start', () => {
    const { getByTestId } = render(<Login />)
    expect(getByTestId('error-wrapper').childElementCount).toBe(0)
  })
})
