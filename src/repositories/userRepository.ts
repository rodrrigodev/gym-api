import { Prisma, User } from '@prisma/client'

export interface UserRepository {
  createUser: (data: Prisma.UserCreateInput) => Promise<User>
  fetchUsersOrSearch: (page: number, query?: string) => Promise<User[]>
  findUserByEmail: (email: string) => Promise<User | null>
  findUserById: (id: string) => Promise<User | null>
  updateUser: (id: string, data: Prisma.UserUpdateInput) => Promise<User | null>
  deleteUserById: (id: string) => Promise<User | null>
}
