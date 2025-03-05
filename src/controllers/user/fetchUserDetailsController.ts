import { UserNotFoundError } from '@/errors/userNotFoundError'
import { useMakeFetchUserDetailsUseCase } from '@/factories/users/useMakeFetchUserDetailsUseCase'
import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

export async function FetchUserDetailsController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const fetchUserSchema = z.object({ id: z.string().uuid() })

  try {
    const { id } = fetchUserSchema.parse(req.params)
    const userDetails = await useMakeFetchUserDetailsUseCase().execute(id)

    res.status(200).send(userDetails)
  } catch (error) {
    if (error instanceof UserNotFoundError) {
      res.status(404).json({ message: error.message })
    } else {
      next(error)
    }
  }
}
