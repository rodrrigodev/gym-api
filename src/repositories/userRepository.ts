import { Prisma, User } from '@prisma/client'

export interface UserDataToUpdate {
  name?: string
  email?: string
  nickname?: string | null
  birthDate?: Date | null
  weight?: number | null
  height?: number | null
  imageUrl?: string | null
}

export interface UserRepository {
  createUser: (data: Prisma.UserCreateInput) => Promise<User>
  fetchUsersOrSearch: (page: number, query?: string) => Promise<User[] | null>
  findUserByEmail: (email: string) => Promise<User | null>
  findUserById: (id: string) => Promise<User | null>
  updateUser: (id: string, data: UserDataToUpdate) => Promise<User | null>
  deleteUserById: (id: string) => Promise<User | null>
}
