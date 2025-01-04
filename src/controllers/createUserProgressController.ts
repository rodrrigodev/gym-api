import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'
import { useMakeCreateUserProgressUseCase } from '@/factories/useMakeCreateUserProgressUseCase'
import { UserNotFoundError } from '@/errors/userNotFoundError'

export async function CreateUserProgressController(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const createUserProgressSchema = z.object({
    userId: z.string().uuid(),
    initialWeight: z.number(),
    currentGoal: z.enum(['slim down', 'bulk up']),
    nextWorkout: z.enum(['chest', 'legs', 'back']),
  })

  try {
    const { currentGoal, initialWeight, nextWorkout, userId } =
      createUserProgressSchema.parse(request.body)

    await useMakeCreateUserProgressUseCase().execute({
      currentGoal,
      initialWeight,
      nextWorkout,
      userId,
    })

    response
      .status(201)
      .send({ message: 'User progress created successfully!' })
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
