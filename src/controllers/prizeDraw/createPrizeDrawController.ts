import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

export async function createPrizeDrawController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const createPrizeDrawSchema = z.object({
    prize: z.string().min(4),
    status: z.enum(['finished', 'waiting']).default('waiting'),
    finishedAt: z.date(),
  })

  try {
    const { prize, status, finishedAt } = createPrizeDrawSchema.parse(req.body)
  } catch {}
}
