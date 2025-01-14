import { PrizeDrawNotFoundError } from '@/errors/prizeDrawNotFoundError'
import { useMakeUpdatePrizeDrawUseCase } from '@/factories/prizeDraw/useMakeUpdatePrizeDrawUseCase'
import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

export async function UpdatePrizeDrawController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const updatePrizeDrawSchema = z.object({
    id: z.string().uuid(),
    prize: z.string().nullable(),
    finishedAt: z.coerce.date().nullable(),
    status: z.string().nullable(),
    drawNumber: z.string().nullable(),
    winnerId: z.string().nullable(),
  })

  try {
    const { id, prize, finishedAt, status, drawNumber, winnerId } =
      updatePrizeDrawSchema.parse(req.body)

    const prizeDrawUpdated = await useMakeUpdatePrizeDrawUseCase().execute({
      id,
      prize: prize ?? undefined,
      finishedAt: finishedAt ?? undefined,
      status: status ?? undefined,
      drawNumber: drawNumber ?? undefined,
      winnerId: winnerId ?? undefined,
    })

    res.status(201).send(prizeDrawUpdated)
  } catch (error) {
    if (error instanceof PrizeDrawNotFoundError) {
      res.status(404).json({ message: error.message })
    } else {
      next()
    }
  }
}
