import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'
import { useMakeUpdateUserUseCase } from '@/factories/users/useMakeUpdateUserUseCase'
import { UserNotFoundError } from '@/errors/userNotFoundError'

export async function UpdateUserController(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const createUserSchema = z.object({
    id: z.string().uuid(),
    email: z.string().min(3).email().nullable(),
    name: z.string().min(3).nullable(),
    nickname: z.string().min(3).nullable(),
    birthDate: z.date().nullable(),
    currentWeight: z.number().nullable(),
    height: z.number().nullable(),
    imageURL: z.string().nullable(),
  })

  try {
    const {
      id,
      birthDate,
      email,
      height,
      imageURL,
      name,
      nickname,
      currentWeight,
    } = createUserSchema.parse(request.body)

    const userUpdated = await useMakeUpdateUserUseCase().execute(id, {
      email: email || undefined,
      name: name || undefined,
      nickname: nickname || undefined,
      birthDate: birthDate || undefined,
      height: height || undefined,
      currentWeight: currentWeight || undefined,
      imageURL: imageURL || undefined,
    })

    response.status(200).send(userUpdated)
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
