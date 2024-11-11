import { EquipmentTracking, Prisma } from '@prisma/client'

export interface EquipmentTrackingRepository {
  createEquipmentTracking: (
    data: Prisma.EquipmentTrackingUncheckedCreateInput,
  ) => Promise<EquipmentTracking | null>

  findGymEquipmentTracking: (
    gym_equipment_id: string,
  ) => Promise<EquipmentTracking | null>
}
