import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'
import { useMakeUpdateUserProgressUseCase } from '@/factories/userProgress/useMakeUpdateUserProgressUseCase'
import { UserProgressError } from '@/errors/userProgressError'

export async function UpdateUserProgressController(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const workoutsSchema = z.object({
    id: z.string(),
    category: z.string(),
    finishedAt: z.date().optional(),
  })

  const updateUserProgressSchema = z.object({
    id: z.string().uuid(),
    initialWeight: z.number().optional(),
    currentGoal: z.enum(['slim down', 'bulk up']).optional(),
    currentStreak: z.number().optional(),
    maxStreakReached: z.number().optional(),
    iaAnalyses: z.string().optional(),
    workouts: z.array(workoutsSchema).optional(),
  })

  try {
    const {
      currentGoal,
      initialWeight,
      id,
      workouts,
      currentStreak,
      maxStreakReached,
      iaAnalyses,
    } = updateUserProgressSchema.parse(request.body)

    const userProgressUpdated =
      await useMakeUpdateUserProgressUseCase().execute(id, {
        currentGoal,
        initialWeight,
        currentStreak,
        maxStreakReached,
        iaAnalyses,
        workouts,
      })

    response.status(200).send(userProgressUpdated)
  } catch (error) {
    if (error instanceof UserProgressError) {
      response.status(404).json({
        message: error.message,
      })
    } else {
      next(error)
    }
  }
}
