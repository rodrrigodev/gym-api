import { EquipmentCodeAlreadyRegisteredError } from '@/errors/equipmentCodeAlreadyRegisteredError'
import { useMakeUpdateGymEquipmentUseCase } from '@/factories/gymEquipment/useMakeUpdateGymEquipmentUseCase'
import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

export async function UpdateGymEquipmentController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const updateGymEquipmentSchema = z.object({
    id: z.string().uuid(),
    name: z.string().nullable(),
    category: z.enum(['chest', 'legs', 'back']).nullable(),
    sets: z.number().nullable(),
    reps: z.number().nullable(),
    cod: z.string().nullable(),
    status: z.string().nullable(),
    last_maintenance: z.date().nullable(),
  })

  try {
    const gymEquipmentData = updateGymEquipmentSchema.parse(req.body)

    const gymEquipment = await useMakeUpdateGymEquipmentUseCase().execute(
      gymEquipmentData.id,
      {
        name: gymEquipmentData.name || undefined,
        category: gymEquipmentData.category || undefined,
        sets: gymEquipmentData.sets || undefined,
        reps: gymEquipmentData.reps || undefined,
        cod: gymEquipmentData.cod || undefined,
        status: gymEquipmentData.status || undefined,
        last_maintenance: gymEquipmentData.last_maintenance || undefined,
      },
    )

    res.status(200).send(gymEquipment)
  } catch (error) {
    if (error instanceof EquipmentCodeAlreadyRegisteredError) {
      res.status(400).json({ message: error.message })
    } else {
      next()
    }
  }
}
