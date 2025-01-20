import { BillNotFoundError } from '@/errors/billNotFoundError'
import { useMakeFetchBillsUseCase } from '@/factories/bill/useMakeFetchBillsUseCase'
import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

export async function FetchBillsController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const fetchBillsSchema = z.object({
    period: z.coerce.number(),
    page: z.coerce.number(),
    name: z.string().nullable(),
    category: z.string().nullable(),
  })

  try {
    const { name, category, page, period } = fetchBillsSchema.parse(req.query)
    const bills = await useMakeFetchBillsUseCase().execute({
      period,
      page,
      name: name || undefined,
      category: category || undefined,
    })

    res.status(200).send(bills)
  } catch (error) {
    if (error instanceof BillNotFoundError) {
      res.status(400).json({ message: error.message })
    } else {
      next()
    }
  }
}
