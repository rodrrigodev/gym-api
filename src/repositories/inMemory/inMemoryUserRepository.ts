import { User } from '@prisma/client'
import { UserRepository } from 'repositories/userRepository'

export class InMeMoryUserRepository implements UserRepository {
  private users: User[] = []

  async create(data: User) {
    this.users.push(data)

    return data
  }
}
