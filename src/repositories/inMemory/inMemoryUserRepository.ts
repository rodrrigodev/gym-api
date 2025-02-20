import { Prisma, User } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { UserRepository } from '../interfaces/userRepository'
import { hash } from 'bcryptjs'
import { getRandomLuckyNumber } from '@/utils/getRandomLuckyNumber'

export class InMemoryUserRepository implements UserRepository {
  private users: User[] = []

  async createUser(data: Prisma.UserUncheckedCreateInput) {
    const passwordHashed = await hash(data.password, 6)

    const user = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password: passwordHashed,
      cell_phone: data.cell_phone || null,
      nickname: data.nickname || null,
      birth_date: data.birth_date ? new Date(data.birth_date) : null,
      current_weight: data.current_weight || null,
      height: data.height || null,
      image_URL: data.image_URL || null,
      role: data.role || 'USER',
      experience_date: data.experience_date
        ? new Date(data.experience_date)
        : null,
      created_at: new Date(),
      last_login: data.last_login ? new Date(data.last_login) : null,
      lucky_numbers: [],
      plan_id: data.plan_id || null,
    }

    this.users.push(user)

    return user
  }

  async findUserByEmail(email: string) {
    const emailAlreadyExists = this.users.find((user) => {
      return user.email === email
    })

    return emailAlreadyExists || null
  }

  async findUserById(id: string) {
    const user = this.users.find((user) => {
      return user.id === id
    })

    return user || null
  }

  async deleteUserById(userId: string) {
    const filteredUsers = this.users.filter((user) => {
      return user.id !== userId
    })

    this.users = filteredUsers

    return 'Successfully deleted! 👍😁'
  }

  async updateUser(id: string, data: Prisma.UserUpdateInput) {
    const usersUpdated = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...data }
      } else {
        return user
      }
    })

    this.users = usersUpdated as User[]

    const UserUpdated = this.users.find((user) => {
      return user.id === id
    })

    return UserUpdated || null
  }

  async fetchUsersOrSearch(page: number, query?: string) {
    if (query) {
      const length = this.users.filter((user) => {
        return (
          user.email.toLowerCase().includes(query.toLowerCase()) ||
          user.name.toLowerCase().includes(query.toLowerCase())
        )
      }).length

      const users = this.users
        .filter((user) => {
          return (
            user.email.toLowerCase().includes(query.toLowerCase()) ||
            user.name.toLowerCase().includes(query.toLowerCase())
          )
        })
        .slice((page - 1) * 20, page * 20)

      return { users, length }
    }

    const length = this.users.length
    const users = this.users.slice((page - 1) * 20, page * 20)

    return { users, length }
  }

  async getLuckyNumber(id: string, type: string) {
    const luckyCode = getRandomLuckyNumber(id, type)

    this.users = this.users.map((user) => {
      if (user.id === id) {
        return {
          ...user,
          lucky_numbers: [...user.lucky_numbers, luckyCode],
        }
      } else {
        return user
      }
    })

    const user = this.users.find((user) => {
      return user.id === id
    })

    return user?.lucky_numbers || null
  }

  async fetchUserDetails(userId: string) {
    const user = this.users.find((user) => {
      return user.id === userId
    })

    return user || null
  }

  async fetchDrawParticipants() {
    const drawParticipants = this.users.filter((user) => {
      return user.lucky_numbers.length >= 1
    })

    return drawParticipants
  }
}
