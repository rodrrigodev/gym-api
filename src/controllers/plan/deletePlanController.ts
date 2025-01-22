import { PlanNotFoundError } from '@/errors/planNotFoundError'
import { useMakeDeletePlanUseCase } from '@/factories/plan/useMakeDeletePlanUseCase'
import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

export async function DeletePlanController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const deletePlanSchema = z.object({
    id: z.string(),
  })

  try {
    const { id } = deletePlanSchema.parse(req.body)

    const message = await useMakeDeletePlanUseCase().execute(id)

    res.status(200).send(message)
  } catch (error) {
    if (error instanceof PlanNotFoundError) {
      res.status(400).json({ message: error.message })
    } else {
      next()
    }
  }
}
