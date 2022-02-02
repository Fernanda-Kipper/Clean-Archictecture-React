import axios from 'axios'
import faker from 'faker'

import { HttpPostParams } from '@/data/protocols/http'
import { AxiosHttpClient } from './axios-http-client'

const mockedAxiosResult = { status: faker.datatype.number(), data: faker.random.objectElement() }

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>
mockedAxios.post.mockResolvedValue(mockedAxiosResult)

const makeSut = (): AxiosHttpClient => {
  return new AxiosHttpClient()
}

const mockPostRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: faker.random.objectElement()
})

describe('AxiosHttpClient', () => {
  test('Should call axios with correct values', async () => {
    const request = mockPostRequest()
    const sut = makeSut()

    await sut.post(request)

    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
  })

  test('Should return the correct statusCode and payload', async () => {
    const sut = makeSut()

    const response = await sut.post(mockPostRequest())

    expect(response).toEqual({
      statusCode: mockedAxiosResult.status,
      body: mockedAxiosResult.data
    })
  })
})
