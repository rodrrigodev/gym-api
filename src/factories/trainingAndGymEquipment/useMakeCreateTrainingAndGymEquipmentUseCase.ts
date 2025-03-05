import { PrismaGymEquipmentRepository } from '@/repositories/prisma/prismaGymEquipmentRepository'
import { PrismaTrainingAndGymEquipmentRepository } from '@/repositories/prisma/prismaTrainingAndGymEquipmentRepository'
import { PrismaTrainingRepository } from '@/repositories/prisma/prismaTrainingRepository'
import { CreateTrainingAndGymEquipmentUseCase } from '@/useCases/trainingAndGymEquipment/createTrainingAndGymEquipmentUseCase'

export function useMakeCreateTrainingAndGymEquipment() {
  const prismaTrainingAndGymEquipmentRepository =
    new PrismaTrainingAndGymEquipmentRepository()

  const prismaTrainingRepository = new PrismaTrainingRepository()

  const prismaGymEquipmentRepository = new PrismaGymEquipmentRepository()

  const createTrainingUseCase = new CreateTrainingAndGymEquipmentUseCase(
    prismaTrainingAndGymEquipmentRepository,
    prismaTrainingRepository,
    prismaGymEquipmentRepository,
  )

  return createTrainingUseCase
}
