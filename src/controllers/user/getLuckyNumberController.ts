import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'
import { useMakeGetLuckyNumberUseCase } from '@/factories/users/useMakeGetLuckyNumberUseCase'
import { UserNotFoundError } from '@/errors/userNotFoundError'

export async function GetLuckyNumberController(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const createUserSchema = z.object({
    id: z.string().uuid(),
    type: z.enum(['str', 'plan', 'ind']),
  })

  try {
    const { id, type } = createUserSchema.parse(request.body)

    const numbers = await useMakeGetLuckyNumberUseCase().execute({ id, type })

    response.status(200).send(numbers)
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
