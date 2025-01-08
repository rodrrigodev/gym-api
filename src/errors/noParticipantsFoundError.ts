export class NoParticipantsFoundError extends Error {
  constructor() {
    super('⚠️ No participants found!')
  }
}
