import { NextFunction, Request, Response } from 'express'

export function authorization(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.access_token

  if (!token) {
    return res.sendStatus(403)
  }
}
