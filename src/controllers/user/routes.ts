import { checkUserRole } from '@/middleware/checkUserRole'
import { isAuthenticate } from '@/middleware/isAuthenticate'
import { Router } from 'express'
import { createUserController } from './createUserController'
import { RefreshTokenController } from './refreshTokenController'
import { UpdateUserController } from './updateUserController'
import { FetchUsersOrSearchController } from './fetchUsersOrSearchController'
import { AuthenticateController } from './authenticateController'
import { DeleteUserController } from './deleteUserController'
import { FetchUserDetailsController } from './fetchUserDetailsController'
import { GetLuckyNumberController } from './getLuckyNumberController'

const router = Router()

router.post('/create', [isAuthenticate, checkUserRole], createUserController)

router.get(
  '/all',
  [isAuthenticate, checkUserRole],
  FetchUsersOrSearchController,
)

router.get('/:id', isAuthenticate, FetchUserDetailsController)

router.post('/refresh-token', RefreshTokenController)

router.post('/auth', AuthenticateController)

router.post('/lucky-number', isAuthenticate, GetLuckyNumberController)

router.patch('/update', [isAuthenticate, checkUserRole], UpdateUserController)

router.delete('/delete', [isAuthenticate, checkUserRole], DeleteUserController)

export { router as userRoutes }
