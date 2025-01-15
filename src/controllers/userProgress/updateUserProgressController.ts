import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'
import { useMakeUpdateUserProgressUseCase } from '@/factories/userProgress/useMakeUpdateUserProgressUseCase'
import { UserProgressError } from '@/errors/userProgressError'

export async function UpdateUserProgressController(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const updateUserProgressSchema = z.object({
    id: z.string().uuid(),
    initialWeight: z.number().nullable(),
    nextWorkout: z.enum(['chest', 'legs', 'back']).nullable(),
    currentGoal: z.enum(['slim down', 'bulk up']).nullable(),
    currentStreak: z.number().nullable(),
    maxStreakReached: z.number().nullable(),
  })

  try {
    const {
      currentGoal,
      initialWeight,
      nextWorkout,
      id,
      currentStreak,
      maxStreakReached,
    } = updateUserProgressSchema.parse(request.body)

    const userProgressUpdated =
      await useMakeUpdateUserProgressUseCase().execute(id, {
        currentGoal,
        initialWeight,
        nextWorkout,
        currentStreak,
        maxStreakReached,
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
