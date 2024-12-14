import { Prisma, User } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { UserRepository } from '../interfaces/userRepository'
import { hash } from 'bcryptjs'
import { generateUniqueLuckyNumber } from '@/utils/generateLuckyNumber'

export class InMemoryUserRepository implements UserRepository {
  private users: User[] = []

  async createUser(data: Prisma.UserUncheckedCreateInput) {
    const passwordHashed = await hash(data.password, 6)

    const user = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password: passwordHashed,
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

    return {
      users: filteredUsers.slice(0, 20),
      length: Math.ceil(filteredUsers.length / 20),
    }
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
    return query
      ? this.users
          .filter((user) => {
            const lowerCaseQuery = query.toLowerCase()
            return (
              user.email.toLowerCase().includes(lowerCaseQuery) ||
              user.name.toLowerCase().includes(lowerCaseQuery)
            )
          })
          .slice((page - 1) * 20, page * 20)
      : this.users.slice((page - 1) * 20, page * 20)
  }

  async getLuckyNumber(id: string, type: string) {
    const generatedNumber = generateUniqueLuckyNumber({
      users: this.users,
      type,
    })

    this.users = this.users.map((user) => {
      if (user.id === id) {
        return {
          ...user,
          lucky_numbers: [...user.lucky_numbers, generatedNumber],
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

  async generatePrizeDrawWinner() {
    type prizeDrawInfoType = { winnerId: string; drawNumber: string }

    const prizeDrawInfo: prizeDrawInfoType[] = []

    this.users.forEach((user) => {
      user.lucky_numbers.forEach((number) => {
        prizeDrawInfo.push({ winnerId: user.id, drawNumber: number })
      })
    })

    const prizeDrawWinner =
      prizeDrawInfo[Math.floor(Math.random() * prizeDrawInfo.length)]

    return prizeDrawWinner
  }

  async fetchUserDetails(userId: string) {
    const user = this.users.find((user) => {
      return user.id === userId
    })

    return user || null
  }
}
