import { Prisma } from '@prisma/client'
import { UserRepository } from '../interfaces/userRepository'
import { prisma } from '@/lib/prisma'

export class PrismaUserRepository implements UserRepository {
  async createUser(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({ data })

    return user
  }

  async findUserByEmail(email: string) {
    const emailAlreadyExists = await prisma.user.findUnique({
      where: { email },
    })

    return emailAlreadyExists
  }

  async findUserById(id: string) {
    const userExists = await prisma.user.findUnique({ where: { id } })

    return userExists
  }

  async deleteUserById(id: string) {
    await prisma.user.delete({ where: { id } })

    return 'Success!'
  }

  async updateUser(id: string, data: UserDataToUpdate) {
    const userUpdated = await prisma.user.update({
      where: { id },
      data,
    })

    return userUpdated
  }

  async fetchUsersOrSearch(page: number, query?: string) {
    const result = query
      ? await prisma.user.findMany({
          where: { OR: [{ name: query }, { email: query }] },
          skip: (page - 1) * 20,
          take: 20,
        })
      : await prisma.user.findMany({ skip: (page - 1) * 20, take: 20 })

    return result
  }

  async fetchUserDetails(userId: string) {
    const user = prisma.user.findUnique({ where: { id: userId } })

    return user
  }

  // getLuckyNumber: (id: string, type: string) => Promise<string[] | null>
}
