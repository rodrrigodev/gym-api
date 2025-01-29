import { EquipmentTracking, Prisma } from '@prisma/client'
import { EquipmentTrackingRepository } from '../interfaces/equipmentTrackingRepository'
import { randomUUID } from 'node:crypto'

export class InMemoryEquipmentTrackingRepository
  implements EquipmentTrackingRepository
{
  private equipmentTrackings: EquipmentTracking[] = []

  async createEquipmentTracking(
    data: Prisma.EquipmentTrackingUncheckedCreateInput,
  ) {
    const equipmentTracking = {
      id: randomUUID(),
      gym_equipment_id: data.gym_equipment_id,
      actual_weight: data.actual_weight,
      initial_weight: data.initial_weight,
      user_progress_id: data.user_progress_id,
      last_update: new Date(),
      active: data.active,
    }

    this.equipmentTrackings.push(equipmentTracking)

    return equipmentTracking
  }

  async checkEquipmentAndUser(gymEquipmentId: string, userProgressId: string) {
    const equipmentTrackingExists = this.equipmentTrackings.find(
      (equipment) => {
        return (
          equipment.user_progress_id === userProgressId &&
          equipment.gym_equipment_id === gymEquipmentId
        )
      },
    )

    return equipmentTrackingExists || null
  }

  async updateEquipmentTracking(
    id: string,
    data: Prisma.EquipmentTrackingUpdateInput,
  ) {
    const equipmentTrackingsUpdated = this.equipmentTrackings.map(
      (equipmentTracking) => {
        if (equipmentTracking.id === id) {
          return { ...equipmentTracking, ...data, last_update: new Date() }
        } else {
          return equipmentTracking
        }
      },
    )

    this.equipmentTrackings = equipmentTrackingsUpdated as EquipmentTracking[]

    const equipmentTrackingUpdated = this.equipmentTrackings.find(
      (equipmentTracking) => {
        return equipmentTracking.id === id
      },
    )

    return equipmentTrackingUpdated || null
  }

  async deleteEquipmentTracking(id: string) {
    const filteredEquipmentTracking = this.equipmentTrackings.filter(
      (tracking) => {
        return tracking.id !== id
      },
    )

    this.equipmentTrackings = filteredEquipmentTracking

    return 'Equipment tracking deleted successfully!'
  }

  async findEquipmentTracking(id: string) {
    const equipmentTracking = this.equipmentTrackings.find((tracking) => {
      return tracking.id === id
    })

    return equipmentTracking || null
  }
}
