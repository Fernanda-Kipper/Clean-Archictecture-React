import axios from 'axios'
import faker from 'faker'

export const mockAxios = (): jest.Mocked<typeof axios> => {
  const mockedAxiosResult = {
    status: faker.datatype.number(),
    data: faker.random.objectElement()
  }

  const mockedAxios = axios as jest.Mocked<typeof axios>
  mockedAxios.post.mockResolvedValue(mockedAxiosResult)

  return mockedAxios
}
