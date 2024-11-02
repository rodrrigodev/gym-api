export class EquipmentAlreadyRegisteredError extends Error {
  constructor() {
    super('⚠️ Equipment Already Registered!')
  }
}
