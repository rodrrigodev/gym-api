import { UserProgressNotFoundError } from '@/errors/userProgressNotFoundError'
import { useMakeCreateActivityUseCase } from '@/factories/activity/useMakeCreateActivityUseCase'
import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

export async function CreateActivityController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const createActivitySchema = z.object({
    userProgressId: z.string().uuid(),
  })

  try {
    const { userProgressId } = createActivitySchema.parse(req.body)

    const activity = await useMakeCreateActivityUseCase().execute({
      userProgressId,
    })

    res.status(201).send(activity)
  } catch (error) {
    if (error instanceof UserProgressNotFoundError) {
      res.status(400).json({ message: error.message })
    } else {
      next()
    }
  }
}
