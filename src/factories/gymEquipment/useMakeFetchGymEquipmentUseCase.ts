import { PrismaGymEquipmentRepository } from '@/repositories/prisma/prismaGymEquipmentRepository'
import { FetchGymEquipmentsUseCase } from '@/useCases/gymEquipment/fetchGymEquipmentsUseCase'

export function useMakeFetchGymEquipmentUseCase() {
  const prismaGymEquipmentRepository = new PrismaGymEquipmentRepository()

  const fetchGymEquipmentUseCase = new FetchGymEquipmentsUseCase(
    prismaGymEquipmentRepository,
  )

  return fetchGymEquipmentUseCase
}
