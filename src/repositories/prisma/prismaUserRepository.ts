import { Prisma } from '@prisma/client'
import { UserRepository } from '../interfaces/userRepository'
import { prisma } from '@/lib/prisma'

export class PrismaUserRepository implements UserRepository {
  async createUser(data: Prisma.UserCreateInput) {
    return await prisma.user.create({ data })
  }

  async findUserByEmail(email: string) {
    return await prisma.user.findUnique({
      where: { email },
    })
  }

  async findUserById(id: string) {
    return await prisma.user.findUnique({ where: { id } })
  }

  async fetchUsersOrSearch(page: number, query?: string) {
    const filters = query
      ? { OR: [{ name: { contains: query } }, { email: { contains: query } }] }
      : {}

    const users = await prisma.user.findMany({
      where: filters,
      skip: (page - 1) * 20,
      take: 20,
    })

    const length = users.length === 20 ? page + 1 : page
    return { users, length }
  }

  async fetchUserDetails(id: string) {
    return await prisma.user.findUnique({ where: { id } })
  }

  async fetchDrawParticipants() {
    return await prisma.user.findMany({
      select: { id: true, lucky_numbers: true },
      where: { lucky_numbers: { isEmpty: false } },
    })
  }

  async updateUser(id: string, data: Prisma.UserUncheckedUpdateInput) {
    return await prisma.user.update({
      where: { id },
      data,
    })
  }

  async deleteUserById(id: string) {
    await prisma.user.delete({ where: { id } })

    return 'User deleted successfully!'
  }
}
