export class BillsNotFoundError extends Error {
  constructor() {
    super('⚠️ Bills not found!')
  }
}
