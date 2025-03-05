import { TrainingGymEquipment } from '@prisma/client'
import { TrainingAndGymEquipmentRepository } from '../interfaces/trainingAndGymEquipmentRepository'

export class InMemoryTrainingAndGymEquipmentRepository
  implements TrainingAndGymEquipmentRepository
{
  private trainingAndGymEquipment: TrainingGymEquipment[] = []

  async createTrainingAndGymEquipment(data: {
    trainingId: string
    gymEquipmentIds: string[]
  }) {
    const gymEquipmentIds: string[] = []

    data.gymEquipmentIds.forEach((gymEquipmentId) => {
      gymEquipmentIds.push(gymEquipmentId)
      this.trainingAndGymEquipment.push({
        trainingId: data.trainingId,
        gymEquipmentId,
      })
    })

    return gymEquipmentIds
  }

  async deleteTrainingEquipment(trainingId: string, gymEquipmentId: string) {
    this.trainingAndGymEquipment = this.trainingAndGymEquipment.filter(
      (training) => {
        return (
          training.trainingId === trainingId &&
          training.gymEquipmentId !== gymEquipmentId
        )
      },
    )

    return 'Gym equipment removed from training!'
  }

  async fetchTrainingsAndGymEquipment(trainingIds: string[]) {
    return this.trainingAndGymEquipment.filter((training) =>
      trainingIds.some((id) => training.trainingId === id),
    )
  }

  async findTrainingsAndGymEquipment(trainingId: string) {
    return this.trainingAndGymEquipment.filter((training) => {
      return training.trainingId === trainingId
    })
  }
}
