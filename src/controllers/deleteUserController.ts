import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'
import { useMakeDeleteUserUseCase } from '@/factories/useMakeCreateUser'
import { UserNotFoundError } from '@/errors/userNotFoundError'

export async function deleteUserController(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const deleteUserSchema = z.object({
    id: z.string().uuid(),
  })

  try {
    const { id } = deleteUserSchema.parse(request.body)

    await useMakeDeleteUserUseCase().execute(id)

    response.status(204).send({ message: 'User deleted successfully!' })
  } catch (error) {
    if (error instanceof UserNotFoundError) {
      response.status(404).json({
        message: error.message,
      })
    } else {
      next(error)
    }
  }
}
