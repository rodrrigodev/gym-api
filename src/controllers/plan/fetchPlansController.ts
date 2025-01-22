import { PlanNotFoundError } from '@/errors/planNotFoundError'
import { useMakeFetchPlansUseCase } from '@/factories/plan/useMakeFetchPlansUseCase'
import { NextFunction, Request, Response } from 'express'

export async function FetchPlansController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const plans = await useMakeFetchPlansUseCase().execute()

    res.status(200).send(plans)
  } catch (error) {
    if (error instanceof PlanNotFoundError) {
      res.status(400).json({ message: error.message })
    } else {
      next()
    }
  }
}
