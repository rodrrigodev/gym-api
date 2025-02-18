import { ActivityPendingError } from '@/errors/activityPendingError'
import { UserProgressNotFoundError } from '@/errors/userProgressNotFoundError'
import { ActivityRepository } from '@/repositories/interfaces/activityRepository'
import { UserProgressRepository } from '@/repositories/interfaces/userProgressRepository'

interface CreateActivityUseCaseRequest {
  userProgressId: string
  trainingId: string
}

type Workout = {
  id: string
  category: string
  finished_at: Date | null
}

export class CreateActivityUseCase {
  constructor(
    private activityRepository: ActivityRepository,
    private userProgressRepository: UserProgressRepository,
  ) {}

  async execute({ userProgressId, trainingId }: CreateActivityUseCaseRequest) {
    const userProgressExists =
      await this.userProgressRepository.findUserProgressById(userProgressId)

    if (!userProgressExists || !userProgressExists.workouts.length) {
      throw new UserProgressNotFoundError()
    }

    const trainingExists = (userProgressExists.workouts as Workout[]).find(
      (training) => training.id === trainingId,
    )

    if (!trainingExists) {
      throw new Error()
    }

    const activityPending = await this.activityRepository.checkActivities()

    if (activityPending) {
      throw new ActivityPendingError()
    }

    const activity = await this.activityRepository.createActivity({
      user_progress_id: userProgressId,
      training_id: trainingExists.id,
      created_at: new Date(),
    })

    return activity
  }
}
