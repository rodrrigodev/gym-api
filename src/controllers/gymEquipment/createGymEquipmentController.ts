import { EquipmentCodeAlreadyRegisteredError } from '@/errors/equipmentCodeAlreadyRegisteredError'
import { useMakeCreateGymEquipmentUseCase } from '@/factories/gymEquipment/useMakeCreateGymEquipmentUseCase'
import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

export async function CreateGymEquipmentController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const createGym equipmentchema = z.object({
    name: z.string(),
    category: z.enum(['chest', 'legs', 'back']),
    sets: z.number(),
    reps: z.number(),
    cod: z.coerce.string(),
    status: z.enum(['available', 'broken', 'maintenance']).default('available'),
    last_maintenance: z.date().default(new Date()),
  })

  try {
    const gymEquipmentData = createGym equipmentchema.parse(req.body)

    const gymEquipment =
      await useMakeCreateGymEquipmentUseCase().execute(gymEquipmentData)

    res.status(201).send(gymEquipment)
  } catch (error) {
    if (error instanceof EquipmentCodeAlreadyRegisteredError) {
      res.status(400).json({ message: error.message })
    } else {
      next()
    }
  }
}
