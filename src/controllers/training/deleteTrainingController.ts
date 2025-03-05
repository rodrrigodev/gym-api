import { TrainingNotFoundError } from '@/errors/trainingNotFoundError'
import { useMakeDeleteTrainingUseCase } from '@/factories/training/useMakeDeleteTrainingUseCase'
import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

export async function DeleteTrainingController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const deleteTrainingSchema = z.object({
    id: z.string().uuid(),
  })

  try {
    const { id } = deleteTrainingSchema.parse(req.body)
    const message = await useMakeDeleteTrainingUseCase().execute(id)

    res.status(200).send({ message })
  } catch (error) {
    if (error instanceof TrainingNotFoundError) {
      res.status(400).json({ message: error.message })
    } else {
      next()
    }
  }
}
