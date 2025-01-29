import { prisma } from '@/lib/prisma'
import { EquipmentTrackingRepository } from '../interfaces/equipmentTrackingRepository'
import { Prisma } from '@prisma/client'

export class PrismaEquipmentTrackingRepository
  implements EquipmentTrackingRepository
{
  async createEquipmentTracking(
    data: Prisma.EquipmentTrackingUncheckedCreateInput,
  ) {
    return await prisma.equipmentTracking.create({ data })
  }

  async checkEquipmentAndUser(gymEquipmentId: string, userProgressId: string) {
    const equipmentTracking = await prisma.equipmentTracking.findFirst({
      where: {
        gym_equipment_id: gymEquipmentId,
        user_progress_id: userProgressId,
      },
    })

    return equipmentTracking
  }

  async findEquipmentTracking(id: string) {
    return await prisma.equipmentTracking.findUnique({
      where: {
        id,
      },
    })
  }

  async updateEquipmentTracking(
    id: string,
    data: Prisma.EquipmentTrackingUpdateInput,
  ) {
    return await prisma.equipmentTracking.update({
      where: { id },
      data,
    })
  }

  async deleteEquipmentTracking(id: string) {
    await prisma.equipmentTracking.delete({ where: { id } })

    return 'Equipment tracking deleted successfully!'
  }
}
