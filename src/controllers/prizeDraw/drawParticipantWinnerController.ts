import { PrizeDrawNotFoundError } from '@/errors/prizeDrawNotFoundError'
import { useMakeDrawParticipantWinnerUseCase } from '@/factories/prizeDraw/useMakeDrawParticipantWinnerUseCase'
import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

export async function DrawParticipantWinnerController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const DrawParticipantSchema = z.object({
    prizeDrawId: z.string().uuid(),
  })

  try {
    const { prizeDrawId } = DrawParticipantSchema.parse(req.body)

    const prizeDrawWinner =
      await useMakeDrawParticipantWinnerUseCase().execute(prizeDrawId)

    res.status(201).send(prizeDrawWinner)
  } catch (error) {
    if (error instanceof PrizeDrawNotFoundError) {
      res.status(404).json({ message: error.message })
    } else {
      next()
    }
  }
}
