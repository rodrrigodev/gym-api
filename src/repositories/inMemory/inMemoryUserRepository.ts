import { Prisma, User } from '@prisma/client'
import { randomUUID } from 'crypto'
import { UserRepository } from '../userRepository'

export class InMemoryUserRepository implements UserRepository {
  private users: User[] = []

  async create(data: Prisma.UserCreateInput) {
    const user = {
      name: data.name,
      id: randomUUID().toString(),
      email: data.email,
      password: data.password,
      nickname: data.nickname || null,
      birthDate: data.birthDate ? new Date(data.birthDate) : null,
      weight: data.weight || null,
      height: data.height || null,
      imageUrl: data.imageUrl || null,
      createdAt: new Date(),
      planId: 'null',
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
    const user = await this.findUserById(id)

    if (user) {
      const filteredUsers = this.users.filter((user) => {
        return user.id !== id
      })

      this.users = filteredUsers
      return 'Success!'
    }

    return null
  }
}
