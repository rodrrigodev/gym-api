import { Router } from 'express'
import { CreateUserProgressController } from './createUserProgressController'
import { UpdateUserProgressController } from './updateUserProgressController'
import { FetchUserProgressResumeController } from './fetchUserProgressResumeController'

const router = Router()

router.post('/create', CreateUserProgressController)

router.get('/resume/:userId', FetchUserProgressResumeController)

router.patch('/update', UpdateUserProgressController)

export { router as userProgressRoutes }
