import { ActivityNotFoundError } from '@/errors/activityNotFoundError'
import { useMakeUpdateActivityUseCase } from '@/factories/activity/useMakeUpdateActivityUseCase'
import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

export async function UpdateActivityController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const updateActivitySchema = z.object({
    activityId: z.string(),
    finishedAt: z.date().nullable(),
  })

  try {
    const { activityId, finishedAt } = updateActivitySchema.parse(req.body)
    const activityUpdated = await useMakeUpdateActivityUseCase().execute({
      activityId,
      finishedAt: finishedAt ?? new Date(),
    })

    res.status(200).send(activityUpdated)
  } catch (error) {
    if (error instanceof ActivityNotFoundError) {
      res.status(400).json({ message: error.message })
    } else {
      next()
    }
  }
}
