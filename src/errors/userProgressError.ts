export class UserProgressError extends Error {
  constructor() {
    super('⚠️ Progress not found or already registered!')
  }
}
