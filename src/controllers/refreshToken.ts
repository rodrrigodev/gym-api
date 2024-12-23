import e, { NextFunction, Request, Response } from 'express'
import { z } from 'zod'
import { UserAlreadyExistsError } from '@/errors/userAlreadyExistsError'
import { useMakeCreateUserUseCase } from '@/factories/useMakeCreateUserUseCase'
import jwt from 'jsonwebtoken'
import { env } from '@/env'

interface JwtPayload {
  id: string
  role: string
}

export async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const refreshToken = req.cookies.jwt
  if (!refreshToken) {
    return res.status(401).send('Access Denied. No refresh token provided.')
  }

  try {
    const decoded = jwt.verify(refreshToken, env.refreshToken) as JwtPayload
    const accessToken = jwt.sign({ userId: decoded.id }, env.accessToken, {
      expiresIn: '1h',
    })

    return res.json({ accessToken })
  } catch (error) {
    return res.status(400).send('Invalid refresh token.')
  }
}
