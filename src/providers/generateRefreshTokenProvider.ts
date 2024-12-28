import { env } from '@/env'
import { Role } from '@prisma/client'
import jwt from 'jsonwebtoken'

interface GenerateRefreshTokenProviderParams {
  userId: string
  role: Role
}

export function generateRefreshTokenProvider({
  userId,
  role,
}: GenerateRefreshTokenProviderParams) {
  const refreshToken = jwt.sign({ userId, role }, env.REFRESH_TOKEN, {
    expiresIn: '10m',
  })

  return refreshToken
}
