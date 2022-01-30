import faker from 'faker'

import { AuthenticationParams } from 'domain/use-cases/authentication'

export const mockAuthentication = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})
