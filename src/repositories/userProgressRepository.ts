import { Prisma, UserProgress } from '@prisma/client'

export interface UserProgressRepository {
  createUserProgress: (
    data: Prisma.UserProgressUncheckedCreateInput,
  ) => Promise<UserProgress | null>
  findUserProgressById: (id: string) => Promise<UserProgress | null>
}
