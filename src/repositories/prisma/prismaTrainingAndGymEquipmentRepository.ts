import { prisma } from '@/lib/prisma'
import { TrainingAndGymEquipmentRepository } from '../interfaces/trainingAndGymEquipmentRepository'

export class PrismaTrainingAndGymEquipmentRepository
  implements TrainingAndGymEquipmentRepository
{
  async createTrainingAndGymEquipment(data: {
    trainingId: string
    gymEquipmentIds: string[]
  }) {
    const { count } = await prisma.trainingGymEquipment.createMany({
      data: data.gymEquipmentIds.map((gymEquipmentId) => ({
        trainingId: data.trainingId,
        gymEquipmentId,
      })),
      skipDuplicates: true,
    })

    return { trainingId: data.trainingId, amount: Number(count) }
  }

  async fetchTrainingsAndGymEquipment(trainingIds: string[]) {
    return await prisma.trainingGymEquipment.findMany({
      where: { trainingId: { in: trainingIds } },
    })
  }

  async deleteTrainingEquipment(trainingId: string, gymEquipmentId: string) {
    await prisma.trainingGymEquipment.delete({
      where: {
        trainingId_gymEquipmentId: {
          trainingId,
          gymEquipmentId,
        },
      },
    })

    return 'Training and gym equipment deleted successfully!'
  }

  async findTrainingsAndGymEquipment(trainingId: string) {
    return await prisma.trainingGymEquipment.findMany({ where: { trainingId } })
  }
}
