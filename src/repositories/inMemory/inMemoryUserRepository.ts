import { Prisma, User } from '@prisma/client'
import { randomUUID } from 'crypto'
import { UserRepository, UserDataToUpdate } from '../userRepository'
import { hash } from 'bcryptjs'

export class InMemoryUserRepository implements UserRepository {
  private users: User[] = []

  async create(data: Prisma.UserCreateInput) {
    const passwordHashed = await hash(data.password, 6)

    const user = {
      name: data.name,
      id: randomUUID().toString(),
      email: data.email,
      password: passwordHashed,
      nickname: data.nickname || null,
      birthDate: data.birthDate ? new Date(data.birthDate) : null,
      weight: data.weight || null,
      height: data.height || null,
      imageUrl: data.imageUrl || null,
      createdAt: new Date(),
      planId: null,
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
      createdAt: userExists.createdAt,
      planId: userExists.planId,
    }
  }
}
