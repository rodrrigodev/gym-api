import { GymEquipment, Prisma } from '@prisma/client'
import { GymEquipmentRepository } from '../interfaces/gymEquipmentRepository'
import { randomUUID } from 'node:crypto'

export class InMemoryGymEquipmentRepository implements GymEquipmentRepository {
  private gym equipment: GymEquipment[] = []

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

    this.gym equipment.push(gymEquipment)

    return gymEquipment
  }

  async checkGymEquipmentCode(cod: string) {
    const equipmentAlreadyRegistered = this.gym equipment.find((equipment) => {
      return equipment.cod === cod
    })

    return equipmentAlreadyRegistered || null
  }

  async updateGymEquipment(id: string, data: Prisma.GymEquipmentUpdateInput) {
    const gym equipmentUpdated = this.gym equipment.map((equipment) => {
      if (equipment.id === id) {
        return { ...equipment, ...data }
      } else {
        return equipment
      }
    })

    this.gym equipment = gym equipmentUpdated as GymEquipment[]

    const gymEquipmentUpdated = this.gym equipment.find((equipment) => {
      return equipment.id === id
    })

    return gymEquipmentUpdated || null
  }

  async findGymEquipment(id: string) {
    const equipmentExists = this.gym equipment.find((equipment) => {
      return equipment.id === id
    })

    return equipmentExists || null
  }

  async fetchGym equipment(nextWorkout: string) {
    const gym equipment = this.gym equipment.filter((equipment) => {
      return equipment.category === nextWorkout
    })

    return gym equipment || null
  }

  async deleteGymEquipment(equipmentId: string) {
    const FilteredGym equipment = this.gym equipment.filter((equipment) => {
      return equipment.id !== equipmentId
    })

    this.gym equipment = FilteredGym equipment

    return 'Gym equipment deleted successfully!'
  }
}
