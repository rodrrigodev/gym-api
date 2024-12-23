import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'
import { UserAlreadyExistsError } from '@/errors/userAlreadyExistsError'
import { useMakeCreateUserUseCase } from '@/factories/useMakeCreateUserUseCase'
import jwt from 'jsonwebtoken'
import { env } from '@/env'

export async function authenticateController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authenticateSchema = z.object({
    email: z.string().min(3).email(),
    password: z.string().min(8),
  })

  try {
    const { email, password } = authenticateSchema.parse(req.body)

    const user = await useMakeCreateUserUseCase().execute()

    if (!user) {
      return res.status(401).json({ error: 'Authentication failed' })
    }

    const accessToken = jwt.sign(
      { userId: user.id, role: user.role },
      env.accessToken,
      {
        expiresIn: '4h',
      },
    )

    const refreshToken = jwt.sign(
      { userId: user.id, role: user.role },
      env.refreshToken,
      {
        expiresIn: '1d',
      },
    )

    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000, // 1d
    })

    return res.json({ accessToken })
    // .json('😁👍 Logged successfully!')
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
