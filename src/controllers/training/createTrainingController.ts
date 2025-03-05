import { useMakeCreateTrainingUseCase } from '@/factories/training/useMakeCreateTrainingUseCase'
import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

export async function CreateTrainingController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const createTrainingSchema = z.object({
    level: z.enum(['beginner', 'medium', 'advanced', 'pro']),
    category: z.string(),
    type: z.enum(['bulk up', 'slim down']),
    ageGroup: z.string(),
    gender: z.enum(['female', 'male']),
  })

  try {
    const data = createTrainingSchema.parse(req.body)
    const training = await useMakeCreateTrainingUseCase().execute({
      ...data,
      age_group: data.ageGroup,
    })

    res.status(201).send(training)
  } catch (error) {
    next()
  }
}
