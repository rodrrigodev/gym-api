import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'
import { useMakeCreateUserProgressUseCase } from '@/factories/userProgress/useMakeCreateUserProgressUseCase'
import { UserNotFoundError } from '@/errors/userNotFoundError'

export async function CreateUserProgressController(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const workoutsSchema = z.object({ id: z.string(), category: z.string() })
  const createUserProgressSchema = z.object({
    userId: z.string().uuid(),
    initialWeight: z.number(),
    currentGoal: z.enum(['slim down', 'bulk up']),
    workouts: z.array(workoutsSchema),
  })

  try {
    const { currentGoal, initialWeight, userId, workouts } =
      createUserProgressSchema.parse(request.body)

    const userProgress = await useMakeCreateUserProgressUseCase().execute({
      currentGoal,
      initialWeight,
      userId,
      workouts,
    })

    response.status(201).send(userProgress)
  } catch (error) {
    if (error instanceof UserNotFoundError) {
      response.status(404).json({
        message: error.message,
      })
    } else {
      next(error)
    }
  }
}
