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
    cellPhone: z.string().min(11).nullable(),
    nickname: z.string().min(3).nullable(),
    birthDate: z.coerce.date().nullable(),
    weight: z.number().nullable(),
    height: z.number().nullable(),
    imageUrl: z.string().nullable(),
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
      nickname: nickname || undefined,
      cellPhone: cellPhone || undefined,
      birthDate: birthDate || undefined,
      height: height || undefined,
      weight: weight || undefined,
      imageUrl: imageUrl || undefined,
      role,
    })

    res.status(201).send(user)
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
