import { InvalidDateError } from '@/errors/invalidDateError'
import { useMakeCreatePrizeDrawUseCase } from '@/factories/prizeDraw/useMakeCreatePrizeDrawUseCase'
import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

export async function CreatePrizeDrawController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const createPrizeDrawSchema = z.object({
    prize: z.string().min(4),
    status: z.enum(['finished', 'waiting']).default('waiting'),
    finishedAt: z.coerce.date(),
  })

  try {
    const { prize, status, finishedAt } = createPrizeDrawSchema.parse(req.body)

    const prizeDraw = await useMakeCreatePrizeDrawUseCase().execute({
      prize,
      finishedAt,
      status,
    })

    res.status(201).send(prizeDraw)
  } catch (error) {
    if (error instanceof InvalidDateError) {
      res.status(400).json({ message: error.message })
    } else {
      next()
    }
  }
}
