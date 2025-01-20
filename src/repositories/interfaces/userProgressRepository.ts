import { Prisma, UserProgress } from '@prisma/client'

export interface UserProgressRepository {
  createUserProgress: (
    data: Prisma.UserProgressUncheckedCreateInput,
  ) => Promise<UserProgress>

  findUserProgressByUserId: (id: string) => Promise<UserProgress | null>

  findUserProgressById: (id: string) => Promise<UserProgress | null>

  updateUserProgress: (
    id: string,
    data: Prisma.UserProgressUpdateInput,
  ) => Promise<UserProgress | null>
}
