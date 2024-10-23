export class UsersNotFoundError extends Error {
  constructor() {
    super('⚠️ Users not found!')
  }
}
