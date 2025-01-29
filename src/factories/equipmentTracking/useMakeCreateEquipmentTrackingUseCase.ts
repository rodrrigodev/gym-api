import { PrismaGymEquipmentRepository } from '@/repositories/prisma/prismaGymEquipmentRepository'
import { PrismaEquipmentTrackingRepository } from '@/repositories/prisma/prismaGymEquipmentTrackingRepository'
import { PrismaUserProgressRepository } from '@/repositories/prisma/prismaUserProgressRepository'
import { CreateEquipmentTrackingUseCase } from '@/useCases/equipmentTracking/createEquipmentTrackingUseCase'

export function useMakeCreateEquipmentTrackingUseCase() {
  const prismaEquipmentTrackingRepository =
    new PrismaEquipmentTrackingRepository()

  const gymEquipmentRepository = new PrismaGymEquipmentRepository()
  const userProgressRepository = new PrismaUserProgressRepository()

  const createEquipmentTrackingUseCase = new CreateEquipmentTrackingUseCase(
    prismaEquipmentTrackingRepository,
    gymEquipmentRepository,
    userProgressRepository,
  )

  return createEquipmentTrackingUseCase
}
