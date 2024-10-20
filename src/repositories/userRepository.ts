import { Prisma, User } from '@prisma/client'

export interface UserRepository {
  create: (data: Prisma.UserCreateInput) => Promise<User>
  findUserByEmail: (email: string) => Promise<User | null>
  findUserById: (id: string) => Promise<User | null>
  deleteUserById: (id: string) => Promise<User | null>
}
