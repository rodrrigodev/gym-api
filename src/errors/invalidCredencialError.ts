export class InvalidCredencialError extends Error {
  constructor() {
    super('⚠️ User or password incorrect!')
  }
}
