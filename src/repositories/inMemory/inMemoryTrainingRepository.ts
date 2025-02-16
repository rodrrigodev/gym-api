import { Prisma, Training } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { TrainingRepository } from '../interfaces/trainingRepository'

export class InMemoryTrainingRepository implements TrainingRepository {
  private training: Training[] = []

  async createTraining(data: Prisma.TrainingCreateInput) {
    const training = {
      id: randomUUID(),
      level: data.level,
      category: data.category,
      type: data.type,
      age_group: data.age_group,
      gender: data.gender,
      gymEquipment: [data.gymEquipment],
    }

    this.training.push(training)

    return training
  }

  async updateTraining(id: string, data: Prisma.TrainingUncheckedUpdateInput) {
    const trainingUpdated = this.training.map((training) => {
      if (training.id === id) {
        return { ...training, ...data }
      } else {
        return training
      }
    })

    this.training = trainingUpdated as Training[]

    return (
      this.training.find((training) => {
        return training.id === id || null
      }) || null
    )
  }

  async fetchTrainings() {
    return this.training
  }

  async findTraining(id: string) {
    return (
      this.training.find((training) => {
        return training.id === id || null
      }) || null
    )
  }
}
