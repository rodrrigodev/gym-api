import { EquipmentNotFoundError } from '@/errors/equipmentNotFoundError'
import { useMakeFetchGymEquipmentUseCase } from '@/factories/gymEquipment/useMakeFetchGymEquipmentUseCase'
import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

export async function FetchGymEquipmentsController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const fetchGymEquipmentSchema = z.object({
    category: z.enum(['chest', 'legs', 'back']),
  })

  const { category } = fetchGymEquipmentSchema.parse(req.query)
  console.log(
    '5484861564847745174515sksjshfuslçjkjshjkakdçafnhjakfhbakljgbhfjagfjhalbhjfbgfathgkdjaçdnqiuwyh7wt627e7hejng673unbqdnbywdq:',
    category,
  )
  try {
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
