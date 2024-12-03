export class LuckyNumberAlreadyExistsError extends Error {
  constructor() {
    super('⚠️ Lucky number already created!')
  }
}
