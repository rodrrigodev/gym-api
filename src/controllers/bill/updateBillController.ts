import { BillNotFoundError } from '@/errors/billNotFoundError'
import { useMakeUpdateBillUseCase } from '@/factories/bill/useMakeUpdateBillUseCase'
import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

export async function UpdateBillController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const updateBillSchema = z.object({
    id: z.string().uuid(),
    name: z.string().nullable(),
    category: z
      .enum(['revenue', 'cleaning', 'maintenance', 'others'])
      .default('others'),
    price: z.coerce.string().nullable(),
  })

  const { name, category, price, id } = updateBillSchema.parse(req.body)
  try {
    const billUpdated = await useMakeUpdateBillUseCase().execute(id, {
      name: name || undefined,
      category: category || undefined,
      price: price || undefined,
    })

    res.status(200).send(billUpdated)
  } catch (error) {
    if (error instanceof BillNotFoundError) {
      res.status(400).json({ message: error.message })
    } else {
      next()
    }
  }
}
