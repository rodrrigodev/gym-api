import { env } from '@/env'
import { useMakeCheckUserAndDateUseCase } from '@/factories/useMakeCheckUserAndDateUseCase'
import { generateTokenProvider } from '@/providers/generateTokenProvider'
import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

export interface Decoded {
  userId: string
  role: string
  iat: number
  exp: number
}

export async function RefreshTokenController(
  req: Request,
  res: Response,
  _: NextFunction,
) {
  const refreshToken = req.cookies.refreshToken

  try {
    const decoded = jwt.verify(refreshToken, env.REFRESH_TOKEN) as Decoded
    const { userId, role } = await useMakeCheckUserAndDateUseCase().execute(
      decoded.userId,
    )

    const token = generateTokenProvider({ userId, role })

    res.status(200).json({ token })
  } catch (error) {
    res.clearCookie('refreshToken').status(400).send('Invalid refresh token.')
  }
}
