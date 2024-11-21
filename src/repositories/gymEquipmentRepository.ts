import { GymEquipment, Prisma } from '@prisma/client'

export interface GymEquipmentRepository {
  createGymEquipment: (
    data: Prisma.GymEquipmentCreateInput,
  ) => Promise<GymEquipment>

  checkGymEquipmentCode: (cod: string) => Promise<GymEquipment | null>

  updateGymEquipment: (
    id: string,
    data: Prisma.GymEquipmentUpdateInput,
  ) => Promise<GymEquipment | null>

  findGymEquipmentById: (id: string) => Promise<GymEquipment | null>

  fetchGymEquipments: (nextWorkout: string) => Promise<GymEquipment[]>

  deleteGymEquipment: (equipmentId: string) => Promise<string>
}
