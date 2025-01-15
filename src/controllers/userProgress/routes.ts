import { Router } from 'express'
import { CreateUserProgressController } from './createUserProgressController'
import { UpdateUserProgressController } from './updateUserProgressController'

const router = Router()

router.post('/create-progress', CreateUserProgressController)

router.patch('/update-progress', UpdateUserProgressController)

export { router as userProgressRoutes }
