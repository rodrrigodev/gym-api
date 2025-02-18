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

  findGymEquipment: (id: string) => Promise<GymEquipment | null>

  fetchGymEquipment: (category: string) => Promise<GymEquipment[]>

  fetchGymEquipmentByIds: (ids: string[]) => Promise<GymEquipment[]>

  deleteGymEquipment: (id: string) => Promise<string>
}
