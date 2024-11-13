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
  }: Prisma.EquipmentTrackingUncheckedCreateInput) {
    const equipmentTracking = {
      id: randomUUID(),
      gym_equipment_id,
      actual_weight,
      initial_weight,
      user_progress_id,
      last_update: new Date(),
    }

    this.equipmentTrackings.push(equipmentTracking)

    return equipmentTracking
  }

  async checkEquipmentAndUser(
    gym_equipment_id: string,
    user_progress_id: string,
  ) {
    const equipmentTrackingExists = this.equipmentTrackings.find(
      (equipment) => {
        return (
          equipment.user_progress_id === user_progress_id &&
          equipment.gym_equipment_id === gym_equipment_id
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
        if (equipmentTracking.id === gym_equipment_id) {
          return { ...equipmentTracking, ...data, last_update: new Date() }
        } else {
          return equipmentTracking
        }
      },
    )

    this.equipmentTrackings = equipmentTrackingsUpdated as EquipmentTracking[]

    const equipmentTracking = this.equipmentTrackings.find(
      (equipmentTracking) => {
        return equipmentTracking.id === gym_equipment_id
      },
    )

    return equipmentTracking || null
  }
}
