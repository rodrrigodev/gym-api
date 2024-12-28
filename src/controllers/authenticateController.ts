import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'
import { useMakeAuthenticateUserUseCase } from '@/factories/useMakeAuthenticateUserUseCase'
import { InvalidCredencialError } from '@/errors/invalidCredencialError'
import { generateTokenProvider } from '@/providers/generateTokenProvider'
import { generateRefreshTokenProvider } from '@/providers/generateRefreshTokenProvider'

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

    const user = await useMakeAuthenticateUserUseCase().execute({
      email,
      password,
    })

    const token = generateTokenProvider({ userId: user.id, role: user.role })

    const refreshToken = generateRefreshTokenProvider({
      userId: user.id,
      role: user.role,
    })

    res
      .cookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
        maxAge: 4 * 60 * 60 * 1000, // 4 hours
      })
      .status(200)
      .send({ token })
  } catch (error) {
    if (error instanceof InvalidCredencialError) {
      res.status(409).json({
        message: error.message,
      })
    } else {
      next(error)
    }
  }
}
