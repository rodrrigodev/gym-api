import { TrainingNotFoundError } from '@/errors/trainingNotFoundError'
import { useMakeFetchTrainingUseCase } from '@/factories/training/useMakeFetchTrainingUseCase'
import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

export async function FetchTrainingController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const fetchTrainingSchema = z.object({
    page: z.coerce.number().default(1),
  })

  try {
    const { page } = fetchTrainingSchema.parse(req.query)
    const trainings = await useMakeFetchTrainingUseCase().execute(page)

    res.status(200).send(trainings)
  } catch (error) {
    if (error instanceof TrainingNotFoundError) {
      res.status(400).json({ message: error.message })
    } else {
      next()
    }
  }
}
