import { Router } from 'express'
import { CreateActivityController } from './createActivityController'
import { UpdateActivityController } from './updateActivityController'

const router = Router()

router.post('/create-activity', CreateActivityController)

router.patch('/update-activity', UpdateActivityController)

export { router as activityRoutes }
