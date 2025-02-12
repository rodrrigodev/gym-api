import { UserNotFoundError } from '@/errors/userNotFoundError'
import { UserProgressError } from '@/errors/userProgressError'
import { ActivityRepository } from '@/repositories/interfaces/activityRepository'
import { UserProgressRepository } from '@/repositories/interfaces/userProgressRepository'
import { UserRepository } from '@/repositories/interfaces/userRepository'
import { getDateDifference } from '@/utils/getDateDifference'

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

    if (!user) throw new UserNotFoundError()

    const activities =
      await this.activityRepository.fetchActivitiesByProgressId(progress.id)

    const exercisesResume = [
      { category: 'chest', amount: 0 },
      { category: 'back', amount: 0 },
      { category: 'legs', amount: 0 },
      { category: 'gluteus', amount: 0 },
      { category: 'deltoids', amount: 0 },
      { category: 'triceps', amount: 0 },
      { category: 'forearm', amount: 0 },
      { category: 'abs', amount: 0 },
      { category: 'cardio', amount: 0 },
      { category: 'biceps', amount: 0 },
    ]

    activities.forEach(({ workout }) => {
      exercisesResume.forEach((exercise) => {
        if (workout === exercise.category) {
          exercise.amount++
        }
      })
    })

    const activitiesResume = {
      totalActivities: activities.length,
      resume: exercisesResume,
    }

    let iaAnalysesDateAllowed =
      progress.ia_analyses_date === null
        ? true
        : getDateDifference(progress.ia_analyses_date) >= 7

    iaAnalysesDateAllowed = !!(
      progress.current_streak >= 3 && iaAnalysesDateAllowed
    )

    return {
      userId: user.id,
      nickname: user.nickname,
      birthDate: user.birth_date,
      initialWeight: progress.initial_weight,
      currentWeight: user.current_weight,
      height: user.height,
      currentGoal: progress.current_goal,
      activitiesResume,
      iaAnalysesDateAllowed,
    }
  }
}
