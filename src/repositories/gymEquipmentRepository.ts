import { GymEquipment, Prisma } from '@prisma/client'

export interface GymEquipmentRepository {
  createGymEquipment: (
    data: Prisma.GymEquipmentCreateInput,
  ) => Promise<GymEquipment | null>

  checkNameAndCode: (name: string, cod: string) => Promise<GymEquipment | null>
}
