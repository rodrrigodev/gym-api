import { ResumeError } from '@/errors/resumeError'
import { UserNotFoundError } from '@/errors/userNotFoundError'
import { UserProgressError } from '@/errors/userProgressError'
import { ActivityRepository } from '@/repositories/interfaces/activityRepository'
import { UserProgressRepository } from '@/repositories/interfaces/userProgressRepository'
import { UserRepository } from '@/repositories/interfaces/userRepository'
import { getDateDifference } from '@/utils/getDateDifference'

export class GetUserProgressResumeUseCase {
  constructor(
    private userRepository: UserRepository,
    private userProgressRepository: UserProgressRepository,
    private activityRepository: ActivityRepository,
  ) {}

  async execute(userId: string) {
    const progress =
      await this.userProgressRepository.findUserProgressByUserId(userId)

    if (!progress) {
      throw new UserProgressError()
    }

    const iaAnalysesDateAllowed =
      progress.ia_analyses_date === null
        ? false
        : getDateDifference(progress.ia_analyses_date) >= 7

    if (progress.current_streak < 3 || iaAnalysesDateAllowed) {
      throw new ResumeError()
    }

    const user = await this.userRepository.findUserById(userId)

    if (!user) throw new UserNotFoundError()

    const activitiesResume = await this.activityRepository.countActivities()

    return {
      nickname: user.nickname,
      birthDate: user.birth_date,
      initialWeight: progress.initial_weight,
      currentWeight: user.current_weight,
      height: user.height,
      currentGoal: progress.current_goal,
      activitiesResume,
    }
  }
}
