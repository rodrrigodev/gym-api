import { PrismaEquipmentTrackingRepository } from '@/repositories/prisma/prismaGymEquipmentTrackingRepository'
import { UpdateEquipmentTrackingUseCase } from '@/useCases/equipmentTracking/updateEquipmentTrackingUseCase'

export function useMakeUpdateEquipmentTrackingUseCase() {
  const prismaEquipmentTrackingRepository =
    new PrismaEquipmentTrackingRepository()

  const updateEquipmentTrackingUseCase = new UpdateEquipmentTrackingUseCase(
    prismaEquipmentTrackingRepository,
  )

  return updateEquipmentTrackingUseCase
}
