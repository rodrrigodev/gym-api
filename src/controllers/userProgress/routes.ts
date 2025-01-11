import { Router } from 'express'
import { CreateUserProgressController } from './createUserProgressController'

const router = Router()

router.post('/create-progress', CreateUserProgressController)

export { router as userProgress }
