import { Prisma, Training } from '@prisma/client'

export interface TrainingRepository {
  createTraining: (data: Prisma.TrainingCreateInput) => Promise<Training>

  fetchTrainings: () => Promise<Training[]>

  findTraining: (id: string) => Promise<Training | null>

  updateTraining: (
    id: string,
    data: Prisma.TrainingUncheckedUpdateInput,
  ) => Promise<Training | null>
}
