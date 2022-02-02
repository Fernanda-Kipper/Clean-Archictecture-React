import { HttpPostParams } from '@/data/protocols/http'
import axios from 'axios'
import faker from 'faker'

import { AxiosHttpClient } from './axios-http-client'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

const makeSut = (): AxiosHttpClient => {
  return new AxiosHttpClient()
}

const mockPostRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: faker.random.objectElement()
})

describe('AxiosHttpClient', () => {
  test('Should call axios with correct URL and method', async () => {
    const request = mockPostRequest()
    const sut = makeSut()

    await sut.post({ url: request.url })

    expect(mockedAxios.post).toHaveBeenCalledWith(request.url)
  })
})
