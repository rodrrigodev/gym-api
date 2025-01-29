import { ActivityNotFoundError } from '@/errors/activityNotFoundError'
import { UserProgressNotFoundError } from '@/errors/userProgressNotFoundError'
import { ActivityRepository } from '@/repositories/interfaces/activityRepository'
import { UserProgressRepository } from '@/repositories/interfaces/userProgressRepository'
import { getDateDifference } from '@/utils/getDateDifference'

interface UpdateActivityUseCaseRequest {
  activityId: string
  finishedAt?: Date
}

export class UpdateActivityUseCase {
  constructor(
    private activityRepository: ActivityRepository,
    private userProgressRepository: UserProgressRepository,
  ) {}

  async execute({ activityId, finishedAt }: UpdateActivityUseCaseRequest) {
    const activityExists =
      await this.activityRepository.findActivity(activityId)

    if (!activityExists || activityExists.finished_at) {
      throw new ActivityNotFoundError()
    }

    const userProgress = await this.userProgressRepository.findUserProgressById(
      activityExists.user_progress_id,
    )

    if (!userProgress) {
      throw new UserProgressNotFoundError()
    }

    const activityUpdated = await this.activityRepository.updateActivity(
      activityId,
      {
        finished_at: !finishedAt ? new Date() : new Date(finishedAt),
      },
    )

    getDateDifference(activityExists.created_at) <= 3
      ? await this.userProgressRepository.updateUserProgress(
          activityExists.user_progress_id,
          {
            current_streak: ++userProgress.current_streak,
            max_streak_reached:
              userProgress.max_streak_reached < userProgress.current_streak
                ? userProgress.current_streak
                : userProgress.max_streak_reached,
          },
        )
      : await this.userProgressRepository.updateUserProgress(
          activityExists.user_progress_id,
          { current_streak: 1 },
        )

    return { activityUpdated }
  }
}
