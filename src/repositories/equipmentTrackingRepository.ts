import { EquipmentTracking, Prisma } from '@prisma/client'

export interface EquipmentTrackingRepository {
  createEquipmentTracking: (
    data: Prisma.EquipmentTrackingUncheckedCreateInput,
  ) => Promise<EquipmentTracking | null>

  checkEquipmentAndUser: (
    gym_equipment_id: string,
    user_progress_id: string,
  ) => Promise<EquipmentTracking | null>

  updateEquipmentTracking: (
    gym_equipment_id: string,
    data: Prisma.EquipmentTrackingUpdateInput,
  ) => Promise<EquipmentTracking | null>
}
