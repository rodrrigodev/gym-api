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

  async findGymEquipmentTracking(gym_equipment_id: string) {
    const equipmentTrackingExists = this.equipmentTrackings.find(
      (equipment) => {
        return equipment.gym_equipment_id === gym_equipment_id
      },
    )

    return equipmentTrackingExists || null
  }
}
