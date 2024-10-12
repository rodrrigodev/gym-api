import { User } from '@prisma/client'

export interface UserRepository {
  create: (data: User) => Promise<User>
}
