import { PrismaGymEquipmentRepository } from '@/repositories/prisma/prismaGymEquipmentRepository'
import { FetchGymEquipmentUseCase } from '@/useCases/gymEquipment/fetchGymEquipmentUseCase'

export function useMakeFetchGymEquipmentUseCase() {
  const prismaGymEquipmentRepository = new PrismaGymEquipmentRepository()

  const fetchGymEquipmentUseCase = new FetchGymEquipmentUseCase(
    prismaGymEquipmentRepository,
  )

  return fetchGymEquipmentUseCase
}
