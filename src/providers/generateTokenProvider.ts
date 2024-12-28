import { env } from '@/env'
import { Role } from '@prisma/client'
import jwt from 'jsonwebtoken'

interface GenerateTokenProviderParams {
  userId: string
  role: Role
}

export function generateTokenProvider({
  userId,
  role,
}: GenerateTokenProviderParams) {
  const token = jwt.sign({ userId, role }, env.ACCESS_TOKEN, {
    expiresIn: '1m',
  })

  return token
}
