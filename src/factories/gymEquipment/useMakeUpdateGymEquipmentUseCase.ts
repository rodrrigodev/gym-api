import { PrismaGymEquipmentRepository } from '@/repositories/prisma/prismaGymEquipmentRepository'
import { UpdateGymEquipmentUseCase } from '@/useCases/gymEquipment/updateGymEquipmentUseCase'

export function useMakeUpdateGymEquipmentUseCase() {
  const prismaGymEquipmentRepository = new PrismaGymEquipmentRepository()

  const updateGymEquipmentUseCase = new UpdateGymEquipmentUseCase(
    prismaGymEquipmentRepository,
  )

  return updateGymEquipmentUseCase
}
