import { verify } from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'
import { env } from '@/env'

export function isAuthenticate(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    res.status(401).json({ message: '⚠️ Unauthorized!' })
  }

  const token = authHeader?.split(' ')[1]

  if (!token) {
    res.status(401).json({ message: '⚠️ Unauthorized!' })
  }

  try {
    const decoded = verify(token, env.ACCESS_TOKEN)
    req.role = decoded.role
    next()
  } catch (error) {
    res.status(403).json({ message: 'Invalid token!' })
  }
}
