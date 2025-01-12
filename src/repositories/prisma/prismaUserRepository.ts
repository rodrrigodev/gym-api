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

  async fetchUsersOrSearch(page: number, query?: string) {
    if (query) {
      const length = Math.ceil(
        (await prisma.user.count({
          where: {
            OR: [{ name: { contains: query } }, { email: { contains: query } }],
          },
        })) / 20,
      )

      const users = await prisma.user.findMany({
        where: {
          OR: [{ name: { contains: query } }, { email: { contains: query } }],
        },
        skip: (page - 1) * 20,
        take: 20,
      })

      return { users, length }
    }
    const length = Math.ceil((await prisma.user.count()) / 20)

    const users = await prisma.user.findMany({
      skip: (page - 1) * 20,
      take: 20,
    })

    return { users, length }
  }

  async fetchUserDetails(userId: string) {
    const user = prisma.user.findUnique({ where: { id: userId } })

    return user
  }

  async fetchDrawParticipants() {
    const participantsInfo = await prisma.user.findMany({
      select: { id: true, lucky_numbers: true },
      where: { lucky_numbers: { isEmpty: false } },
    })

    return participantsInfo
  }

  async updateUser(id: string, data: Prisma.UserUpdateInput) {
    const userUpdated = await prisma.user.update({
      where: { id },
      data: { ...data },
    })

    return userUpdated
  }

  async deleteUserById(id: string) {
    await prisma.user.delete({ where: { id } })

    return 'User deleted successfully!!'
  }
}
