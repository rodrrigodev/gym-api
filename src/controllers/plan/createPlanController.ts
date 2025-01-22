import { PlanAlreadyExistsError } from '@/errors/planAlreadyExistsError'
import { useMakeCreatePlanUseCase } from '@/factories/plan/useMakeCreatePlanUseCase'
import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

export async function CreatePlanController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const createPlanSchema = z.object({
    name: z
      .enum(['basic', 'standard', 'premium', 'premium++'])
      .default('standard'),
    price: z.string(),
  })

  try {
    const { name, price } = createPlanSchema.parse(req.body)

    const plan = await useMakeCreatePlanUseCase().execute({
      name,
      price,
    })

    res.status(201).send(plan)
  } catch (error) {
    if (error instanceof PlanAlreadyExistsError) {
      res.status(400).json({ message: error.message })
    } else {
      next()
    }
  }
}
