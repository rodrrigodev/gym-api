import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { GymEquipmentRepository } from '../interfaces/gymEquipmentRepository'

export class PrismaGymEquipmentRepository implements GymEquipmentRepository {
  async createGymEquipment(data: Prisma.GymEquipmentCreateInput) {
    const gymEquipment = await prisma.gymEquipment.create({ data })

    return gymEquipment
  }

  async checkGymEquipmentCode(cod: string) {
    return await prisma.gymEquipment.findFirst({ where: { cod } })
  }

  async findGymEquipment(id: string) {
    return (await prisma.gymEquipment.findUnique({ where: { id } })) || null
  }

  async fetchGymEquipment(data: { ids: string[]; category?: string }) {
    const gymEquipment = data.category
      ? await prisma.gymEquipment.findMany({ where: { id: { in: data.ids } } })
      : await prisma.gymEquipment.findMany({
          where: { category: data.category },
        })

    return gymEquipment
  }

  async updateGymEquipment(id: string, data: Prisma.GymEquipmentUpdateInput) {
    return await prisma.gymEquipment.update({
      where: { id },
      data,
    })
  }

  async deleteGymEquipment(id: string) {
    await prisma.gymEquipment.delete({ where: { id } })

    return 'Gym equipment deleted successfully!'
  }
}
