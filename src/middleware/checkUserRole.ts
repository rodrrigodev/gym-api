import { NextFunction, Request, Response } from 'express'

export function checkUserRole(req: Request, res: Response, next: NextFunction) {
  const role = req.role

  if (role === 'ADMIN') {
    next()
  } else {
    res.status(401).json({ message: 'Not authorized! 👎😕' })
  }
}
