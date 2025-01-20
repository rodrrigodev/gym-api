import { BillNotFoundError } from '@/errors/billNotFoundError'
import { useMakeDeleteBillsUseCase } from '@/factories/bill/useMakeDeleteBillUseCase'
import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

export async function DeleteBillsController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const deleteBillsSchema = z.object({
    id: z.string().uuid(),
  })

  try {
    const { id } = deleteBillsSchema.parse(req.body)
    const message = await useMakeDeleteBillsUseCase().execute(id)

    res.status(200).send(message)
  } catch (error) {
    if (error instanceof BillNotFoundError) {
      res.status(400).json({ message: error.message })
    } else {
      next()
    }
  }
}
