export class UserProgressNotFoundError extends Error {
  constructor() {
    super('⚠️ User progress not found!')
  }
}
