import { ActivityPendingError } from '@/errors/activityPendingError'
import { UserProgressNotFoundError } from '@/errors/userProgressNotFoundError'
import { ActivityRepository } from '@/repositories/interfaces/activityRepository'
import { UserProgressRepository } from '@/repositories/interfaces/userProgressRepository'

interface CreateActivityUseCaseRequest {
  userProgressId: string
  workout: string
}

export class CreateActivityUseCase {
  constructor(
    private activityRepository: ActivityRepository,
    private userProgressRepository: UserProgressRepository,
  ) {}

  async execute({ userProgressId, workout }: CreateActivityUseCaseRequest) {
    const userProgressExists =
      await this.userProgressRepository.findUserProgressByProgressId(
        userProgressId,
      )

    if (!userProgressExists) {
      throw new UserProgressNotFoundError()
    }

    const activityPending = await this.activityRepository.checkActivities()

    if (activityPending) {
      throw new ActivityPendingError()
    }

    const activity = await this.activityRepository.createActivity({
      user_progress_id: userProgressId,
      workout,
      created_at: new Date(),
    })

    return activity
  }
}
