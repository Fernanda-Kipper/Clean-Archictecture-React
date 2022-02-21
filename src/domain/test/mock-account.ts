import faker from 'faker'

import { AuthenticationParams } from '@/domain/use-cases/authentication'
import { AccountModel } from '../models/account-model'

export const mockAuthentication = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAccountModel = (): AccountModel => ({
  accessToken: faker.random.alphaNumeric()
})
