import { Prisma } from '@prisma/client'
import { TrainingRepository } from '../interfaces/trainingRepository'
import { prisma } from '@/lib/prisma'

export class PrismaTrainingRepository implements TrainingRepository {
  async createTraining(data: Prisma.TrainingCreateInput) {
    return await prisma.training.create({
      data: {
        age_group: data.age_group,
        category: data.category,
        gender: data.gender,
        level: data.level,
        type: data.type,
      },
    })
  }

  async findTraining(id: string) {
    return await prisma.training.findUnique({ where: { id } })
  }

  async fetchTrainings(page: number) {
    const length = Math.ceil((await prisma.training.count()) / 20)

    const trainings = await prisma.training.findMany({
      skip: (page - 1) * 20,
      take: 20,
    })

    return { trainings, length }
  }

  async deleteTraining(id: string) {
    await prisma.training.delete({ where: { id } })

    return 'Training deleted successfully!'
  }

  async updateTraining(id: string, data: Prisma.TrainingUncheckedUpdateInput) {
    return await prisma.training.update({ where: { id }, data })
  }
}
