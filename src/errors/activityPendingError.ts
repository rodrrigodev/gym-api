export class ActivityPendingError extends Error {
  constructor() {
    super('⚠️ Activity pending!')
  }
}
