export class DrawNotPossibleError extends Error {
  constructor() {
    super('⚠️ Draw is not possible!')
  }
}
