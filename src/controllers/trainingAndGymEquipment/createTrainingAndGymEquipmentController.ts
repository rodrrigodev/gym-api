import { TrainingNotFoundError } from '@/errors/trainingNotFoundError'
import { useMakeCreateTrainingAndGymEquipment } from '@/factories/trainingAndGymEquipment/useMakeCreateTrainingAndGymEquipmentUseCase'
import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

export async function createTrainingAndGymEquipmentController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const createTrainingAndGymEquipmentSchema = z.object({
    trainingId: z.string().uuid(),
    gymEquipmentIds: z.array(z.string().uuid()),
  })

  try {
    const data = createTrainingAndGymEquipmentSchema.parse(req.body)
    const trainingAndGymEquipment =
      await useMakeCreateTrainingAndGymEquipment().execute(data)

    res.status(201).send(trainingAndGymEquipment)
  } catch (error) {
    if (error instanceof TrainingNotFoundError) {
      res.status(400).json({ message: error.message })
    } else {
      next()
    }
  }
}
