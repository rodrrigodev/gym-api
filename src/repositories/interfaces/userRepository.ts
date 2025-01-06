import { Prisma, User } from '@prisma/client'

export interface UserRepository {
  createUser: (data: Prisma.UserUncheckedCreateInput) => Promise<User>

  fetchUsersOrSearch: (
    page: number,
    query?: string,
  ) => Promise<{ users: User[]; length: number }>

  findUserByEmail: (email: string) => Promise<User | null>

  findUserById: (id: string) => Promise<User | null>

  updateUser: (id: string, data: Prisma.UserUpdateInput) => Promise<User | null>

  deleteUserById: (userId: string) => Promise<string>

  getLuckyNumber: (id: string, type: string) => Promise<string[] | null>

  generatePrizeDrawWinner: () => Promise<{
    winnerId: string
    drawNumber: string
  }>

  fetchUserDetails: (userId: string) => Promise<User | null>
}
