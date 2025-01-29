import { PrismaEquipmentTrackingRepository } from '@/repositories/prisma/prismaGymEquipmentTrackingRepository'
import { DeleteEquipmentTrackingUseCase } from '@/useCases/equipmentTracking/deleteEquipmentTrackingUseCase'

export function useMakeDeleteEquipmentTrackingUseCase() {
  const prismaEquipmentTrackingRepository =
    new PrismaEquipmentTrackingRepository()

  const deleteEquipmentTrackingUseCase = new DeleteEquipmentTrackingUseCase(
    prismaEquipmentTrackingRepository,
  )

  return deleteEquipmentTrackingUseCase
}
