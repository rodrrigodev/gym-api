import { UserProgressError } from '@/errors/userProgressError'
import { ActivityRepository } from '@/repositories/interfaces/activityRepository'
import { UserProgressRepository } from '@/repositories/interfaces/userProgressRepository'
import { UserRepository } from '@/repositories/interfaces/userRepository'

export class FetchUserProgressResumeUseCase {
  constructor(
    private userRepository: UserRepository,
    private userProgressRepository: UserProgressRepository,
    private activityRepository: ActivityRepository,
  ) {}

  async execute(progressId: string) {
    const progress =
      await this.userProgressRepository.findUserProgressById(progressId)

    if (!progress) {
      throw new UserProgressError()
    }

    const user = await this.userRepository.findUserById(progress.user_id)

    if (!user) {
      throw new Error()
    }

    const period =
      new Date().getDate() <= 10
        ? new Date().getDate() + 10
        : new Date().getDate()

    const activities =
      await this.activityRepository.fetchLastActivitiesByProgressId(
        progress.id,
        period,
      )

    if (!activities) {
      throw new Error()
    }

    const activitiesUpdated = activities.map((activity) => {
      return {
        id: activity.id,
        created_at: activity.created_at,
        finished_at: activity.finished_at,
        training_id: activity.training_id,
      }
    })

    return {
      user: {
        ...user,
        password: undefined,
      },
      progress: {
        ...progress,
        user_id: undefined,
        ai_allowed: progress.current_streak % 7 === 0,
      },
      activities: activitiesUpdated,
    }
  }
}
