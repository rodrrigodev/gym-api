import { env } from '@/env'
import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

interface JwtPayload {
  id: string
  role: string
}

interface AuthenticatedRequest extends Request {
  userId?: string
  userRole?: string
}

export function authorization(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) {
  const token = req.cookies.access_token

  if (!token) {
    return res.status(403)
  }

  try {
    const data = jwt.verify(token, env.TOKEN_SECRET) as JwtPayload

    req.userId = data.id

    req.userRole = data.role

    return next()
  } catch {
    return res.sendStatus(403)
  }
}
