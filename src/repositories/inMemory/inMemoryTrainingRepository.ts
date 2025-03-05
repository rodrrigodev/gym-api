import { Prisma, Training } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { TrainingRepository } from '../interfaces/trainingRepository'

export class InMemoryTrainingRepository implements TrainingRepository {
  private trainings: Training[] = []

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

    this.trainings.push(training)

    return training
  }

  async updateTraining(id: string, data: Prisma.TrainingUncheckedUpdateInput) {
    const trainingUpdated = this.trainings.map((training) => {
      if (training.id === id) {
        return { ...training, ...data }
      } else {
        return training
      }
    })

    this.trainings = trainingUpdated as Training[]

    return (
      this.trainings.find((training) => {
        return training.id === id
      }) || null
    )
  }

  async fetchTrainings(page: number) {
    return {
      trainings: this.trainings.slice((page - 1) * 20, page * 20),
      length: Math.ceil(this.trainings.length / 20),
    }
  }

  async findTraining(id: string) {
    return (
      this.trainings.find((training) => {
        return training.id === id || null
      }) || null
    )
  }

  async deleteTraining(id: string) {
    this.trainings = this.trainings.filter((training) => {
      return training.id !== id
    })

    return 'Training deleted successfully!'
  }
}
