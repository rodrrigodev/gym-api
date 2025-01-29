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
    cellPhone: z.string().min(11).nullable(),
    name: z.string().min(3).nullable(),
    nickname: z.string().min(3).nullable(),
    birthDate: z.date().nullable(),
    currentWeight: z.number().nullable(),
    height: z.number().nullable(),
    imageURL: z.string().nullable(),
  })

  try {
    const userDataUpdated = createUserSchema.parse(request.body)

    const userUpdated = await useMakeUpdateUserUseCase().execute(
      userDataUpdated.id,
      {
        email: userDataUpdated.email || undefined,
        name: userDataUpdated.name || undefined,
        nickname: userDataUpdated.nickname || undefined,
        birthDate: userDataUpdated.birthDate || undefined,
        height: userDataUpdated.height || undefined,
        currentWeight: userDataUpdated.currentWeight || undefined,
        imageURL: userDataUpdated.imageURL || undefined,
        cellPhone: userDataUpdated.cellPhone || undefined,
      },
    )

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
