import { Prisma, User } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { UserRepository } from '../userRepository'
import { hash } from 'bcryptjs'

export class InMemoryUserRepository implements UserRepository {
  private users: User[] = []

  async createUser(data: Prisma.UserCreateInput) {
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
      experience_date: null,
      created_at: new Date(),
      lucky_numbers: [],
      plan_id: null,
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

    return 'Success!'
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
}
