import { checkUserRole } from '@/middleware/checkUserRole'
import { isAuthenticate } from '@/middleware/isAuthenticate'
import { Router } from 'express'
import { createUserController } from './createUserController'
import { RefreshTokenController } from './refreshTokenController'
import { UpdateUserController } from './updateUserController'
import { FetchUsersOrSearchController } from './fetchUsersOrSearchController'
import { CreateUserProgressController } from '../createUserProgressController'
import { AuthenticateController } from './authenticateController'
import { DeleteUserController } from './deleteUserController'

const router = Router()

router.post(
  '/create-user',
  [isAuthenticate, checkUserRole],
  createUserController,
)

router.get('/users', FetchUsersOrSearchController)

router.post('/refresh-token', RefreshTokenController)

router.post('/login', AuthenticateController)

router.post('/create-progress', CreateUserProgressController)

router.patch('/update-user', UpdateUserController)

router.delete('/delete-user', DeleteUserController)

export { router as userRoutes }
