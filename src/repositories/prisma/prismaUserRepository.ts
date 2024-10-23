import { Prisma } from '@prisma/client'
import { UserDataToUpdate, UserRepository } from '../userRepository'
import { prisma } from '@/lib/prisma'

export class PrismaUserRepository implements UserRepository {
  async create(data: Prisma.UserCreateInput) {
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
    const deletedUser = await prisma.user.delete({ where: { id } })

    return deletedUser
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
}
