import { Request, Response } from 'express'
import { z } from 'zod'

export function createUserController(request: Request, response: Response) {
  const createUserSchema = z.object({
    email: z.string().min(3),
    password: z.string().min(8),
    name: z.string().min(3),
    nickname: z.string().min(3).nullable(),
    birthDate: z.date().nullable(),
    weight: z.number().nullable(),
    height: z.number().nullable(),
    imageUrl: z.string().nullable(),
  })

  const {
    email,
    password,
    name,
    nickname,
    birthDate,
    height,
    weight,
    imageUrl,
  } = createUserSchema.parse(request.body)
}
