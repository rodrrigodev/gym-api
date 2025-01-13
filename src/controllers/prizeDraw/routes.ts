import { checkUserRole } from '@/middleware/checkUserRole'
import { isAuthenticate } from '@/middleware/isAuthenticate'
import { Router } from 'express'
import { createPrizeDrawController } from './createPrizeDrawController'

const router = Router()

router.post(
  '/create-prize',
  [isAuthenticate, checkUserRole],
  createPrizeDrawController,
)

export { router as prizeDrawRoutes }
