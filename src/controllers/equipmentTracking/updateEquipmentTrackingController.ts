import { EquipmentTrackingNotFoundError } from '@/errors/equipmentTrackingNotFoundError'
import { useMakeUpdateEquipmentTrackingUseCase } from '@/factories/equipmentTracking/useMakeUpdateEquipmentTrackingUseCase'
import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

export async function UpdateEquipmentTrackingController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const createEquipmentTrackingSchema = z.object({
    id: z.string().uuid(),
    actualWeight: z.coerce.number(),
  })

  try {
    const { id, actualWeight } = createEquipmentTrackingSchema.parse(req.body)
    const updatedEquipmentTracking =
      await useMakeUpdateEquipmentTrackingUseCase().execute(id, actualWeight)

    res.status(201).send(updatedEquipmentTracking)
  } catch (error) {
    if (error instanceof EquipmentTrackingNotFoundError) {
      res.status(400).json({ message: error.message })
    } else {
      next()
    }
  }
}
