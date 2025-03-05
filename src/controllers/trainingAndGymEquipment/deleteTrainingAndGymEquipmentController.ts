import { TrainingNotFoundError } from '@/errors/trainingNotFoundError'
import { useMakeDeleteTrainingAndGymEquipment } from '@/factories/trainingAndGymEquipment/useMakeDeleteTrainingAndGymEquipmentUseCase'
import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

export async function DeleteTrainingAndGymEquipmentController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const deleteTrainingAndGymEquipmentSchema = z.object({
    trainingId: z.string().uuid(),
    gymEquipmentId: z.string().uuid(),
  })

  try {
    const data = deleteTrainingAndGymEquipmentSchema.parse(req.body)
    const message = await useMakeDeleteTrainingAndGymEquipment().execute(data)

    res.status(200).send({ message })
  } catch (error) {
    if (error instanceof TrainingNotFoundError) {
      res.status(400).json({ message: error.message })
    } else {
      next()
    }
  }
}
