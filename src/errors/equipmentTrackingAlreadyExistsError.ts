export class EquipmentTrackingAlreadyExistsError extends Error {
  constructor() {
    super('⚠️ Equipment tracking already exists!')
  }
}
