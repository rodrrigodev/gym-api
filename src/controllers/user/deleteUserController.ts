import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'
import { useMakeDeleteUserUseCase } from '@/factories/useMakeDeleteUserUseCase'
import { UserNotFoundError } from '@/errors/userNotFoundError'

export async function DeleteUserController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const deleteUserSchema = z.object({
    id: z.string().uuid(),
  })

  try {
    const { id } = deleteUserSchema.parse(req.body)

    const message = await useMakeDeleteUserUseCase().execute(id)

    res.status(200).send({ message })
  } catch (error) {
    if (error instanceof UserNotFoundError) {
      res.status(404).json({
        message: error.message,
      })
    } else {
      next(error)
    }
  }
}
