import { useMakeCreateBillUseCase } from '@/factories/bill/useMakeCreateBillUseCase'
import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

export async function CreateBillController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const createBillSchema = z.object({
    name: z.string(),
    category: z.string(),
    price: z.string(),
  })

  try {
    const { name, category, price } = createBillSchema.parse(req.body)

    const bill = await useMakeCreateBillUseCase().execute({
      name,
      category,
      price,
    })

    res.status(201).send(bill)
  } catch (error) {
    next()
  }
}
