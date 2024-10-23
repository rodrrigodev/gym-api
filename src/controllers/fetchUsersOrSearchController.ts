import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'
import { useMakeFetchUsersOrSearchUseCase } from '@/factories/useMakeFetchUsersOrSearchUseCase'
import { UsersNotFoundError } from '@/errors/usersNotFoundError'

export async function FetchUsersOrSearchController(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const createUserSchema = z.object({
    page: z.coerce.number().default(1),
    query: z.string().min(3).email().nullable(),
  })

  try {
    const { page, query } = createUserSchema.parse(request.query)

    await useMakeFetchUsersOrSearchUseCase().execute(page, query || undefined)

    response.status(200).send({ message: 'Users fetched successfully!' })
  } catch (error) {
    if (error instanceof UsersNotFoundError) {
      response.status(404).json({
        message: error.message,
      })
    } else {
      next(error)
    }
  }
}
