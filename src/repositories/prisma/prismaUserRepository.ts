import { User } from '@prisma/client'
import { prisma } from 'lib/prisma'
import { UserRepository } from 'repositories/userRepository'

export class PrismaUserRepository implements UserRepository {
  async create(data: User) {
    const user = await prisma.user.create({ data })

    return user
  }
}
