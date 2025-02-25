import { EquipmentTracking, Prisma } from '@prisma/client'

export interface EquipmentTrackingRepository {
  createEquipmentTracking: (
    data: Prisma.EquipmentTrackingUncheckedCreateInput,
  ) => Promise<EquipmentTracking>

  checkEquipmentAndUser: (
    gymEquipmentId: string,
    userProgressId: string,
  ) => Promise<EquipmentTracking | null>

  findEquipmentTrackings: (ids: string[]) => Promise<EquipmentTracking[]>

  updateEquipmentTracking: (
    id: string,
    data: Prisma.EquipmentTrackingUpdateInput,
  ) => Promise<EquipmentTracking | null>

  deleteEquipmentTracking: (id: string) => Promise<string>
}
