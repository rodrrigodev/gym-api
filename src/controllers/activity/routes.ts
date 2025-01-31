import { Router } from 'express'
import { CreateActivityController } from './createActivityController'
import { UpdateActivityController } from './updateActivityController'

const router = Router()

router.post('/create', CreateActivityController)

router.patch('/update', UpdateActivityController)

export { router as activityRoutes }
