import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from '@/errors/userAlreadyExistsError'
import { useMakeCreateUserUseCase } from '@/factories/useMakeCreateUserUseCase'

export async function createUserController(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const createUserSchema = z.object({
    email: z.string().min(3).email(),
    password: z.string().min(8),
    name: z.string().min(3),
    nickname: z.string().min(3).nullable(),
    birthDate: z.coerce.date().nullable(),
    weight: z.number().nullable(),
    height: z.number().nullable(),
    imageUrl: z.string().nullable(),
    role: z.string().nullable(),
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
    } = createUserSchema.parse(request.body)

    const hashedPassword = await hash(password, 6)

    console.log(request.role)

    const user = await useMakeCreateUserUseCase().execute({
      email,
      password: hashedPassword,
      name,
      nickname: nickname || undefined,
      birthDate: birthDate || undefined,
      height: height || undefined,
      weight: weight || undefined,
      imageUrl: imageUrl || undefined,
      role: role || undefined,
    })

    response.status(201).send({ message: 'User created successfully!' })
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      response.status(409).json({
        message: error.message,
      })
    } else {
      next(error)
    }
  }
}
