import { UserProgressRepository } from '@/repositories/userProgressRepository'

export async function createUserProgressTestHelper(
  userProgressRepository: UserProgressRepository,
  userId: string,
) {
  const userProgress = await userProgressRepository.createUserProgress({
    user_id: userId,
  })

  return userProgress
}
