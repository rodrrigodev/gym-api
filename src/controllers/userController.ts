import { Request, Response } from 'express'
import { useMakeCreateUserUseCase } from 'factories/useMakeCreateUser'
import { z } from 'zod'
import { hash } from 'bcryptjs'

export async function createUserController(
  request: Request,
  response: Response,
) {
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
    name,
    email,
    password,
    nickname,
    birthDate,
    weight,
    height,
    imageUrl,
  } = createUserSchema.parse(request.body)
  const hashedPassword = await hash(password, 6)

  try {
    await useMakeCreateUserUseCase().execute({
      email,
      password: hashedPassword,
      name,
      nickname: nickname || undefined,
      birthDate: birthDate || undefined,
      height: height || undefined,
      weight: weight || undefined,
      imageUrl: imageUrl || undefined,
    })
    response.status(201).send({ message: 'User created successfully!' })
  } catch (error) {
    response.status(409).send(error)
  }
}
