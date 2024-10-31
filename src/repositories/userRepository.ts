import { Prisma, User } from '@prisma/client'

export interface UserDataToUpdate {
  name?: string
  email?: string
  nickname?: string | null
  birth_date?: Date | null
  current_weight?: number | null
  height?: number | null
  image_URL?: string | null
}

export interface UserRepository {
  createUser: (data: Prisma.UserCreateInput) => Promise<User>
  fetchUsersOrSearch: (page: number, query?: string) => Promise<User[] | null>
  findUserByEmail: (email: string) => Promise<User | null>
  findUserById: (id: string) => Promise<User | null>
  updateUser: (id: string, data: UserDataToUpdate) => Promise<User | null>
  deleteUserById: (id: string) => Promise<User | null>
}
