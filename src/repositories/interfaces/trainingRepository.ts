import { Prisma, Training } from '@prisma/client'

export interface TrainingRepository {
  createTraining: (data: Prisma.TrainingCreateInput) => Promise<Training>

  fetchTrainings: (
    page: number,
  ) => Promise<{ length: number; trainings: Training[] }>

  findTraining: (id: string) => Promise<Training | null>

  deleteTraining: (id: string) => Promise<string>

  updateTraining: (
    id: string,
    data: Prisma.TrainingUncheckedUpdateInput,
  ) => Promise<Training | null>
}
