export class UserProgressError extends Error {
  constructor() {
    super('⚠️ User not found or already registered!')
  }
}
