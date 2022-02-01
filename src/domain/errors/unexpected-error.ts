export class UnexpectedError extends Error {
  constructor () {
    super('Algo de errado aconteceu, tente novamente mais tarde.')
    this.name = 'UnexpectedError'
  }
}
