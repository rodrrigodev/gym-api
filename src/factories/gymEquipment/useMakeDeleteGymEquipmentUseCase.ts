import { PrismaGymEquipmentRepository } from '@/repositories/prisma/prismaGymEquipmentRepository'
import { DeleteGymEquipmentUseCase } from '@/useCases/gymEquipment/deleteGymEquipmentUseCase'

export function useMakeDeleteGymEquipmentUseCase() {
  const prismaGymEquipmentRepository = new PrismaGymEquipmentRepository()

  const deleteGymEquipmentUseCase = new DeleteGymEquipmentUseCase(
    prismaGymEquipmentRepository,
  )

  return deleteGymEquipmentUseCase
}
