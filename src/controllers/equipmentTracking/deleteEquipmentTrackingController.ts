import { EquipmentTrackingNotFoundError } from '@/errors/equipmentTrackingNotFoundError'
import { useMakeDeleteEquipmentTrackingUseCase } from '@/factories/equipmentTracking/useMakeDeleteEquipmentTrackingUseCase'
import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

export async function DeleteEquipmentTrackingController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const deleteEquipmentTrackingSchema = z.object({
    id: z.string().uuid(),
  })

  try {
    const { id } = deleteEquipmentTrackingSchema.parse(req.body)

    const message = await useMakeDeleteEquipmentTrackingUseCase().execute(id)

    res.status(200).send({ message })
  } catch (error) {
    if (error instanceof EquipmentTrackingNotFoundError) {
      res.status(400).json({ message: error.message })
    } else {
      next()
    }
  }
}
