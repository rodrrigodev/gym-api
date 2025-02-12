import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from '@/errors/userAlreadyExistsError'
import { useMakeCreateUserUseCase } from '@/factories/users/useMakeCreateUserUseCase'

export async function createUserController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const createUserSchema = z.object({
    email: z.string().min(3).email(),
    password: z.string().min(8),
    name: z.string().min(3),
    cellPhone: z.string().min(11).optional(),
    nickname: z.string().min(3).optional(),
    birthDate: z.coerce.date().optional(),
    weight: z.number().optional(),
    height: z.number().optional(),
    imageUrl: z.string().optional(),
    role: z.enum(['ADMIN', 'USER']).default('USER'),
  })

  try {
    const {
      birthDate,
      email,
      height,
      imageUrl,
      name,
      nickname,
      password,
      weight,
      role,
      cellPhone,
    } = createUserSchema.parse(req.body)

    const hashedPassword = await hash(password, 6)

    const user = await useMakeCreateUserUseCase().execute({
      email,
      password: hashedPassword,
      name,
      nickname,
      cellPhone,
      birthDate,
      height,
      weight,
      imageUrl,
      role,
    })

    res.status(201).send({ ...user, password: undefined })
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      res.status(409).json({
        message: error.message,
      })
    } else {
      next(error)
    }
  }
}
