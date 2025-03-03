import { EquipmentNotFoundError } from '@/errors/equipmentNotFoundError'
import { useMakeDeleteGymEquipmentUseCase } from '@/factories/gymEquipment/useMakeDeleteGymEquipmentUseCase'
import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

export async function DeleteGymEquipmentController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const deleteGymEquipmentSchema = z.object({
    id: z.string().uuid(),
  })

  try {
    const { id } = deleteGymEquipmentSchema.parse(req.body)

    const message = await useMakeDeleteGymEquipmentUseCase().execute(id)

    res.status(200).send({ message })
  } catch (error) {
    if (error instanceof EquipmentNotFoundError) {
      res.status(400).json({ message: error.message })
    } else {
      next()
    }
  }
}
