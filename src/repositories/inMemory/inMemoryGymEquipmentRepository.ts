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

  async checkGymEquipmentCode(cod: string) {
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

  async fetchGymEquipments(nextWorkout: string) {
    const gymEquipments = this.gymEquipments.filter((equipment) => {
      return equipment.category === nextWorkout
    })

    return gymEquipments || null
  }

  async deleteGymEquipment(equipmentId: string) {
    const FilteredGymEquipments = this.gymEquipments.filter((equipment) => {
      return equipment.id !== equipmentId
    })

    this.gymEquipments = FilteredGymEquipments

    return {
      gymEquipments: FilteredGymEquipments.slice(0, 20),
      length: Math.ceil(FilteredGymEquipments.length / 20),
    }
  }
}
