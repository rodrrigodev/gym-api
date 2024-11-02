import { Prisma, User } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { UserRepository, UserDataToUpdate } from '../userRepository'
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

  async deleteUserById(id: string) {
    const userExists = await this.findUserById(id)

    if (!userExists) {
      return null
    }

    const filteredUsers = this.users.filter((user) => {
      return user.id !== id
    })

    this.users = filteredUsers
    return userExists
  }

  async updateUser(id: string, data: UserDataToUpdate) {
    const userExists = await this.findUserById(id)

    if (!userExists) {
      return null
    }

    const checkedData = {
      ...userExists,
      ...data,
    }

    this.users = this.users.map((user) =>
      user.id === userExists.id ? { ...user, ...checkedData } : user,
    )

    return {
      ...checkedData,
      password: userExists.password,
      created_at: userExists.created_at,
      plan_id: userExists.plan_id,
    }
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
