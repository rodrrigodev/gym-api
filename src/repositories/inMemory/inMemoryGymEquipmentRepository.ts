import { GymEquipment, Prisma } from '@prisma/client'
import { GymEquipmentRepository } from '../gymEquipmentRepository'
import { randomUUID } from 'node:crypto'

export class InMemoryGymEquipmentRepository implements GymEquipmentRepository {
  private gymEquipments: GymEquipment[] = []

  async createGymEquipment({
    id,
    name,
    category,
    cod,
    reps,
    sets,
    status,
    last_maintenance,
  }: Prisma.GymEquipmentCreateInput) {
    const gymEquipment = {
      id: id || randomUUID(),
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

  async checkCode(cod: string) {
    const equipmentAlreadyRegistered = this.gymEquipments.find((equipment) => {
      return equipment.cod === cod
    })

    return equipmentAlreadyRegistered || null
  }

  async updateGymEquipment(id: string, data: Prisma.GymEquipmentUpdateInput) {
    const gymEquipmentsUpdated = this.gymEquipments.map((equipment) => {
      if (equipment.id === id) {
        return { ...equipment, ...data }
      } else {
        return equipment
      }
    })

    this.gymEquipments = gymEquipmentsUpdated as GymEquipment[]

    const gymEquipmentUpdated = this.gymEquipments.find((equipment) => {
      return equipment.id === id
    })

    return gymEquipmentUpdated || null
  }

  async findGymEquipmentById(id: string) {
    const equipmentExists = this.gymEquipments.find((equipment) => {
      return equipment.id === id
    })

    return equipmentExists || null
  }
}
