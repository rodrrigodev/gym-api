import { GymEquipment, Prisma } from '@prisma/client'
import { GymEquipmentRepository } from '../gymEquipmentRepository'
import { randomUUID } from 'node:crypto'

export class InMemoryGymEquipmentRepository implements GymEquipmentRepository {
  private gymEquipments: GymEquipment[] = []

  async createGymEquipment({
    name,
    category,
    cod,
    reps,
    sets,
    status,
    last_maintenance,
  }: Prisma.GymEquipmentCreateInput) {
    const gymEquipment = {
      id: randomUUID(),
      name,
      category,
      cod,
      reps,
      sets,
      status,
      last_maintenance: new Date(last_maintenance),
    }

    this.gymEquipments.push(gymEquipment)

    return gymEquipment
  }

  async checkNameAndCode(name: string, cod: string) {
    const equipmentAlreadyRegistered = this.gymEquipments.find((equipment) => {
      return equipment.name === name || equipment.cod === cod
    })

    return equipmentAlreadyRegistered || null
  }
}
