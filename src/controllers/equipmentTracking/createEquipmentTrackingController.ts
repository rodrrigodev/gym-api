import { UserProgressError } from '@/errors/userProgressError'
import { useMakeCreateEquipmentTrackingUseCase } from '@/factories/equipmentTracking/useMakeCreateEquipmentTrackingUseCase'
import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

export async function CreateEquipmentTrackingController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const createEquipmentTrackingSchema = z.object({
    actualWeight: z.coerce.number(),
    initialWeight: z.coerce.number(),
    gymEquipmentId: z.string().uuid(),
    userProgressId: z.string().uuid(),
    active: z.boolean(),
  })

  try {
    const equipmentTrackingData = createEquipmentTrackingSchema.parse(req.body)

    const equipmentTracking =
      await useMakeCreateEquipmentTrackingUseCase().execute(
        equipmentTrackingData,
      )

    res.status(201).send(equipmentTracking)
  } catch (error) {
    if (error instanceof UserProgressError) {
      res.status(400).json({ message: error.message })
    } else {
      next()
    }
  }
}
