export class PlanAlreadyExistsError extends Error {
  constructor() {
    super('⚠️ Plan already exists!')
  }
}
