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

  async fetchTrainingAndGymEquipment(equipmentId: string) {
    return this.trainingAndGymEquipment.filter((item) => {
      return item.gymEquipmentId === equipmentId
    })
  }

  async addTrainingEquipment(trainingId: string, gymEquipmentIds: string[]) {
    let trainingEquipment: TrainingGymEquipment[] = []

    trainingEquipment = gymEquipmentIds.map((gymEquipmentId) => ({
      trainingId,
      gymEquipmentId,
    }))

    this.trainingAndGymEquipment.push(...trainingEquipment)
    return trainingEquipment
  }

  async deleteTrainingEquipment(trainingId: string, gymEquipmentIds: string[]) {
    this.trainingAndGymEquipment = this.trainingAndGymEquipment.filter(
      (item) =>
        !(
          item.trainingId === trainingId &&
          gymEquipmentIds.some((id) => item.gymEquipmentId === id)
        ),
    )

    return 'Equipment deleted successfully!'
  }
}
