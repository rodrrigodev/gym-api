import { UserProgressRepository } from '@/repositories/userProgressRepository'

interface CreateUserProgressTestHelper {
  userProgressRepository: UserProgressRepository
  userId: string
  streak?: number
  max_streak?: number
}

export async function createUserProgressTestHelper({
  userId,
  userProgressRepository,
  max_streak,
  streak,
}: CreateUserProgressTestHelper) {
  const userProgress = await userProgressRepository.createUserProgress({
    user_id: userId,
    current_streak: streak || 0,
    max_streak_reached: max_streak || 0,
    initial_weight: 78,
    current_goal: 'slim down',
  })

  return userProgress
}
