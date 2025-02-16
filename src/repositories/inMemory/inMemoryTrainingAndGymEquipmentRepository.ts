import { Prisma, TrainingGymEquipment } from '@prisma/client'
import { TrainingAndGymEquipmentRepository } from '../interfaces/trainingAndGymEquipmentRepository'

export class InMemoryTrainingAndGymEquipmentRepository
  implements TrainingAndGymEquipmentRepository
{
  private trainingAndGymEquipment: TrainingGymEquipment[] = []

  async createTrainingAndGymEquipment(
    data: Prisma.TrainingGymEquipmentCreateManyInput,
  ) {
    const trainingAndGymEquipment: TrainingGymEquipment = {
      trainingId: data.trainingId,
      gymEquipmentId: data.gymEquipmentId,
    }

    this.trainingAndGymEquipment.push(trainingAndGymEquipment)

    return trainingAndGymEquipment
  }
}
