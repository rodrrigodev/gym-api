import { env } from '@/env'
import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  next: NextFunction,
): void {
  if (err instanceof z.ZodError) {
    res.status(400).json({
      error: err.issues,
    })
  }

  if (env.NODE_ENV !== 'production') {
    console.log(err)
  } else {
    next()
  }
}
