import { EquipmentNotFoundError } from '@/errors/equipmentNotFoundError'
import { useMakeFetchGymEquipmentUseCase } from '@/factories/gymEquipment/useMakeFetchGymEquipmentUseCase'
import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

export async function FetchGym equipmentController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const fetchGym equipmentchema = z.object({
    category: z.enum(['chest', 'legs', 'back']),
  })

  try {
    const { category } = fetchGym equipmentchema.parse(req.query)
    const gymEquipment =
      await useMakeFetchGymEquipmentUseCase().execute(category)

    res.status(200).send(gymEquipment)
  } catch (error) {
    if (error instanceof EquipmentNotFoundError) {
      res.status(400).json({ message: error.message })
    } else {
      next()
    }
  }
}
