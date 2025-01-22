import { PlanNotFoundError } from '@/errors/planNotFoundError'
import { useMakeUpdatePlanUseCase } from '@/factories/plan/useMakeUpdatePlanUseCase'
import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

export async function CreatePlanController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const updatePlanSchema = z.object({
    id: z.string(),
    name: z
      .enum(['basic', 'standard', 'premium', 'premium++'])
      .default('standard'),
    price: z.string(),
  })

  try {
    const { name, price, id } = updatePlanSchema.parse(req.body)

    const planUpdated = await useMakeUpdatePlanUseCase().execute({
      name,
      price,
      id,
    })

    res.status(201).send(planUpdated)
  } catch (error) {
    if (error instanceof PlanNotFoundError) {
      res.status(400).json({ message: error.message })
    } else {
      next()
    }
  }
}
