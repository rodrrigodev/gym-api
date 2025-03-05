import { TrainingNotFoundError } from '@/errors/trainingNotFoundError'
import { useMakeUpdateTrainingUseCase } from '@/factories/training/useMakeUpdateTrainingUseCase'
import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

export async function UpdateTrainingController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const updateTrainingSchema = z.object({
    id: z.string().uuid(),
    level: z.string().optional(),
    category: z.string().optional(),
    type: z.string().optional(),
    ageGroup: z.string().optional(),
    gender: z.string().optional(),
  })

  try {
    const data = updateTrainingSchema.parse(req.body)
    const training = await useMakeUpdateTrainingUseCase().execute({
      ...data,
      age_group: data.ageGroup,
    })

    res.status(200).send(training)
  } catch (error) {
    if (error instanceof TrainingNotFoundError) {
      res.status(400).json({ message: error.message })
    } else {
      next()
    }
  }
}
