export class EquipmentCodeAlreadyRegisteredError extends Error {
  constructor() {
    super('⚠️ Equipment code already registered!')
  }
}
