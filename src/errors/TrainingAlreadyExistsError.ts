export class TrainingAlreadyExistsError extends Error {
  constructor() {
    super('⚠️ Training already exists!')
  }
}
