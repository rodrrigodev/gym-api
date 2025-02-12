import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'
import { UserNotFoundError } from '@/errors/userNotFoundError'
import { useMakeGetUserProgressResumeUseCase } from '@/factories/userProgress/useMakeGetUserProgressResumeUseCase'

export async function FetchUserProgressResumeController(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const getUserProgressResumeSchema = z.object({
    userId: z.string().uuid(),
  })

  try {
    const { userId } = getUserProgressResumeSchema.parse(request.params)

    const userProgressResume =
      await useMakeGetUserProgressResumeUseCase().execute(userId)

    response.status(200).send(userProgressResume)
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
