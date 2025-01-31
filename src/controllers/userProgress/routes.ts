import { Router } from 'express'
import { CreateUserProgressController } from './createUserProgressController'
import { UpdateUserProgressController } from './updateUserProgressController'

const router = Router()

router.post('/create', CreateUserProgressController)

router.patch('/update', UpdateUserProgressController)

export { router as userProgressRoutes }
