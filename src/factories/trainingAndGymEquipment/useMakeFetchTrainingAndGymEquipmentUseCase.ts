import { PrismaGymEquipmentRepository } from '@/repositories/prisma/prismaGymEquipmentRepository'
import { PrismaTrainingAndGymEquipmentRepository } from '@/repositories/prisma/prismaTrainingAndGymEquipmentRepository'
import { FetchTrainingAndGymEquipmentUseCase } from '@/useCases/trainingAndGymEquipment/fetchTrainingAndGymEquipmentUseCase'

export function useMakeFetchTrainingAndGymEquipment() {
  const prismaTrainingAndGymEquipmentRepository =
    new PrismaTrainingAndGymEquipmentRepository()

  const prismaGymEquipmentRepository = new PrismaGymEquipmentRepository()

  const fetchTrainingAndGymEquipmentUseCase =
    new FetchTrainingAndGymEquipmentUseCase(
      prismaTrainingAndGymEquipmentRepository,
      prismaGymEquipmentRepository,
    )

  return fetchTrainingAndGymEquipmentUseCase
}
