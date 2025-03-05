import { PrismaTrainingAndGymEquipmentRepository } from '@/repositories/prisma/prismaTrainingAndGymEquipmentRepository'
import { DeleteTrainingAndGymEquipmentUseCase } from '@/useCases/trainingAndGymEquipment/deleteTrainingAndGymEquipmentUseCase'

export function useMakeDeleteTrainingAndGymEquipment() {
  const prismaTrainingAndGymEquipmentRepository =
    new PrismaTrainingAndGymEquipmentRepository()

  const deleteTrainingUseCase = new DeleteTrainingAndGymEquipmentUseCase(
    prismaTrainingAndGymEquipmentRepository,
  )

  return deleteTrainingUseCase
}
