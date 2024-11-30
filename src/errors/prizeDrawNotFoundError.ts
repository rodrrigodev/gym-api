export class PrizeDrawNotFoundError extends Error {
  constructor() {
    super('⚠️ Prize draw not found!')
  }
}
