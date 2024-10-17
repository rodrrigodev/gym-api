import { Prisma } from '@prisma/client'
import { UserRepository } from '../userRepository'
import { prisma } from '@/lib/prisma'

export class PrismaUserRepository implements UserRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({ data })

    return user
  }

  async findByEmail(email: string) {
    const emailAlreadyExists = await prisma.user.findUnique({
      where: { email },
    })

    return emailAlreadyExists
  }
}
