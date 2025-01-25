import { PrismaGymEquipmentRepository } from '@/repositories/prisma/prismaGymEquipmentRepository'
import { CreateGymEquipmentUseCase } from '@/useCases/gymEquipment/createGymEquipmentUseCase'

export function useMakeCreateGymEquipmentUseCase() {
  const prismaGymEquipmentRepository = new PrismaGymEquipmentRepository()

  const createGymEquipmentUseCase = new CreateGymEquipmentUseCase(
    prismaGymEquipmentRepository,
  )

  return createGymEquipmentUseCase
}
