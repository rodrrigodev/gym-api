import { Prisma, UserProgress } from '@prisma/client'

export interface UserProgressRepository {
  createUserProgress: (
    data: Prisma.UserProgressUncheckedCreateInput,
  ) => Promise<UserProgress | null>

  findUserProgressByUserId: (userId: string) => Promise<UserProgress | null>

  updateUserProgress: (
    id: string,
    data: Prisma.UserProgressUpdateInput,
  ) => Promise<UserProgress | null>
}
