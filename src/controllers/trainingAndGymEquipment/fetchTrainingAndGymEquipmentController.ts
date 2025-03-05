import { TrainingNotFoundError } from '@/errors/trainingNotFoundError'
import { useMakeFetchTrainingAndGymEquipment } from '@/factories/trainingAndGymEquipment/useMakeFetchTrainingAndGymEquipmentUseCase'
import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

export async function FetchTrainingAndGymEquipmentController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const fetchTrainingAndGymEquipmentSchema = z.object({
    id: z.string().uuid(),
  })

  try {
    const { id } = fetchTrainingAndGymEquipmentSchema.parse(req.params)
    const trainingAndGymEquipment =
      await useMakeFetchTrainingAndGymEquipment().execute(id)

    res.status(200).send(trainingAndGymEquipment)
  } catch (error) {
    if (error instanceof TrainingNotFoundError) {
      res.status(400).json({ message: error.message })
    } else {
      next()
    }
  }
}
