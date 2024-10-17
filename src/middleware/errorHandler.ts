import { env } from '@/env'
import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _: NextFunction,
): void {
  if (env.NODE_ENV !== 'production') {
    console.log(err)
  }

  // console.log(env.NODE_ENV)

  if (err instanceof z.ZodError) {
    res.status(400).json({
      error: err.issues,
    })
  } else {
    const error = err as Error

    res.status(500).json({
      message: error.message ?? 'Internal server error',
    })
  }
}
