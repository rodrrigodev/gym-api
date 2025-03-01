import { GymEquipment, Prisma } from '@prisma/client'
import { GymEquipmentRepository } from '../interfaces/gymEquipmentRepository'
import { randomUUID } from 'node:crypto'

export class InMemoryGymEquipmentRepository implements GymEquipmentRepository {
  private gymEquipment: GymEquipment[] = []

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

    this.gymEquipment.push(gymEquipment)

    return gymEquipment
  }

  async checkGymEquipmentCode(cod: string) {
    const equipmentAlreadyRegistered = this.gymEquipment.find((equipment) => {
      return equipment.cod === cod
    })

    return equipmentAlreadyRegistered || null
  }

  async updateGymEquipment(id: string, data: Prisma.GymEquipmentUpdateInput) {
    const gymEquipmentUpdated = this.gymEquipment.map((equipment) => {
      if (equipment.id === id) {
        return { ...equipment, ...data }
      } else {
        return equipment
      }
    })

    this.gymEquipment = gymEquipmentUpdated as GymEquipment[]

    return (
      this.gymEquipment.find((equipment) => {
        return equipment.id === id
      }) || null
    )
  }

  async findGymEquipment(id: string) {
    const equipmentExists = this.gymEquipment.find((equipment) => {
      return equipment.id === id
    })

    return equipmentExists || null
  }

  async fetchGymEquipment(data: { ids: string[]; category?: string }) {
    const gymEquipment = data.category
      ? this.gymEquipment.filter((equipment) => {
          return equipment.category === data.category
        })
      : this.gymEquipment.filter((equipment) => {
          return data.ids.some((id) => equipment.id === id)
        })

    return gymEquipment
  }

  async deleteGymEquipment(equipmentId: string) {
    const FilteredGymEquipment = this.gymEquipment.filter((equipment) => {
      return equipment.id !== equipmentId
    })

    this.gymEquipment = FilteredGymEquipment

    return 'Gym equipment deleted successfully!'
  }

  async findGymEquipmentByIds(ids: string[]) {
    return this.gymEquipment.filter((equipment) => ids.includes(equipment.id))
  }
}
