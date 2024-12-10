import { EquipmentTracking, Prisma } from '@prisma/client'
import { EquipmentTrackingRepository } from '../equipmentTrackingRepository'
import { randomUUID } from 'node:crypto'

export class InMemoryEquipmentTrackingRepository
  implements EquipmentTrackingRepository
{
  private equipmentTrackings: EquipmentTracking[] = []

  async createEquipmentTracking({
    actual_weight,
    gym_equipment_id,
    initial_weight,
    user_progress_id,
    active,
  }: Prisma.EquipmentTrackingUncheckedCreateInput) {
    const equipmentTracking = {
      id: randomUUID(),
      gym_equipment_id,
      actual_weight,
      initial_weight,
      user_progress_id,
      last_update: new Date(),
      active,
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
    gym_equipment_id: string,
    data: Prisma.EquipmentTrackingUpdateInput,
  ) {
    const equipmentTrackingsUpdated = this.equipmentTrackings.map(
      (equipmentTracking) => {
        if (equipmentTracking.gym_equipment_id === gym_equipment_id) {
          return { ...equipmentTracking, ...data, last_update: new Date() }
        } else {
          return equipmentTracking
        }
      },
    )

    this.equipmentTrackings = equipmentTrackingsUpdated as EquipmentTracking[]

    const equipmentTrackingUpdated = this.equipmentTrackings.find(
      (equipmentTracking) => {
        return equipmentTracking.gym_equipment_id === gym_equipment_id
      },
    )

    return equipmentTrackingUpdated || null
  }

  async deleteEquipmentTracking(EquipmentTrackingId: string) {
    const filteredEquipmentTracking = this.equipmentTrackings.filter(
      (tracking) => {
        return tracking.id !== EquipmentTrackingId
      },
    )

    this.equipmentTrackings = filteredEquipmentTracking

    return {
      equipmentTrackings: filteredEquipmentTracking.slice(0, 20),
      length: Math.ceil(filteredEquipmentTracking.length / 20),
    }
  }
}
