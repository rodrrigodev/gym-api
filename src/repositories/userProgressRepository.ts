import { Prisma, UserProgress } from '@prisma/client'

export interface CreateUserProgressData {
  userId: string
  initialWeight: number
  currentGoal: string
  nextWorkout: string | null
}

export interface UserProgressRepository {
  createUserProgress: (
    data: Prisma.UserProgressUncheckedCreateInput,
  ) => Promise<UserProgress | null>
  findUserProgressById: (id: string) => Promise<UserProgress | null>
}
