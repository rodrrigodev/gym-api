import { PrizeDrawNotFoundError } from '@/errors/prizeDrawNotFoundError'
import { useMakeFetchPrizeDrawsUseCase } from '@/factories/prizeDraw/useMakeFetchPrizeDrawsUseCase'
import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

export async function FetchPrizeDrawsControllers(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const fetchPrizeDrawSchema = z.object({
    page: z.coerce.number().default(1),
  })

  try {
    const { page } = fetchPrizeDrawSchema.parse(req.params)

    const prizeDrawWinner = await useMakeFetchPrizeDrawsUseCase().execute(page)

    res.status(200).send(prizeDrawWinner)
  } catch (error) {
    if (error instanceof PrizeDrawNotFoundError) {
      res.status(404).json({ message: error.message })
    } else {
      next()
    }
  }
}
