import { Prisma, User } from '@prisma/client'

export interface UserRepository {
  createUser: (data: Prisma.UserUncheckedCreateInput) => Promise<User>

  findUserByEmail: (email: string) => Promise<User | null>

  findUserById: (id: string) => Promise<User | null>

  fetchUserDetails: (userId: string) => Promise<User | null>

  fetchDrawParticipants: () => Promise<
    { id: string; lucky_numbers: string[] }[]
  >

  fetchUsersOrSearch: (
    page: number,
    query?: string,
  ) => Promise<{ users: User[]; length: number }>

  updateUser: (
    id: string,
    data: Prisma.UserUncheckedUpdateInput,
  ) => Promise<User | null>

  deleteUserById: (userId: string) => Promise<string>
}
