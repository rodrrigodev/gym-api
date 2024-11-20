import { UsersNotFoundError } from '@/errors/usersNotFoundError'
import { UserRepository } from '@/repositories/userRepository'

export class FetchUsersOrSearchUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(page: number, query?: string) {
    const searchUsersResult = await this.userRepository.fetchUsersOrSearch(
      page,
      query,
    )

    if (!searchUsersResult?.length) {
      throw new UsersNotFoundError()
    }

    return searchUsersResult
  }
}
