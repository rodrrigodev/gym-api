import { EquipmentCodeAlreadyRegisteredError } from '@/errors/equipmentCodeAlreadyRegisteredError'
import { useMakeCreateGymEquipmentUseCase } from '@/factories/gymEquipment/useMakeCreateGymEquipmentUseCase'
import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

export async function CreateGymEquipmentController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const createGymEquipmentSchema = z.object({
    name: z.string(),
    category: z.enum(['chest', 'legs', 'back']),
    sets: z.number(),
    reps: z.number(),
    cod: z.string(),
    status: z.string(),
    last_maintenance: z.date(),
  })

  try {
    const gymEquipmentData = createGymEquipmentSchema.parse(req.body)

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
