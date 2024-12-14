import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'
import { UserAlreadyExistsError } from '@/errors/userAlreadyExistsError'
import { useMakeCreateUserUseCase } from '@/factories/useMakeCreateUserUseCase'
import jwt from 'jsonwebtoken'
import { env } from '@/env'

export async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const loginSchema = z.object({
    email: z.string().min(3).email(),
    password: z.string().min(8),
  })

  try {
    const { email, password } = loginSchema.parse(req.body)

    const user = await useMakeCreateUserUseCase().execute()

    if (!user) {
      return res.status(401).json({ error: 'Authentication failed' })
    }

    const token = jwt.sign(
      { email: user.email, role: user.role },
      env.TOKEN_SECRET,
      { expiresIn: '7d' },
    )

    res
      .cookie('access_token', token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 4, // 4 hours
      })
      .status(200)
      .json('😁👍 Logged successfully!')
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      res.status(409).json({
        message: error.message,
      })
    } else {
      next(error)
    }
  }
}
