import { PrismaGymEquipmentRepository } from '@/repositories/prisma/prismaGymEquipmentRepository'
import { FetchGym equipmentUseCase } from '@/useCases/gymEquipment/fetchGym equipmentUseCase'

export function useMakeFetchGymEquipmentUseCase() {
  const prismaGymEquipmentRepository = new PrismaGymEquipmentRepository()

  const fetchGymEquipmentUseCase = new FetchGym equipmentUseCase(
    prismaGymEquipmentRepository,
  )

  return fetchGymEquipmentUseCase
}
