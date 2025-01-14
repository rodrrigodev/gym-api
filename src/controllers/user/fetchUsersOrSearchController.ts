import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'
import { useMakeFetchUsersOrSearchUseCase } from '@/factories/users/useMakeFetchUsersOrSearchUseCase'
import { UsersNotFoundError } from '@/errors/usersNotFoundError'

export async function FetchUsersOrSearchController(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const fetchUserOrSearchSchema = z.object({
    page: z.coerce.number().default(1),
    query: z
      .string()
      .nullable()
      .refine((val) => !val || val.length >= 3, {
        message: z.ZodIssueCode.too_small,
      }),
  })

  try {
    const { page, query } = fetchUserOrSearchSchema.parse(request.query)

    const users = await useMakeFetchUsersOrSearchUseCase().execute(
      page,
      query || undefined,
    )

    response.status(200).send(users)
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
