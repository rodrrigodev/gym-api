import { Router } from 'express'
import { CreatePlanController } from './createPlanController'
import { FetchPlansController } from './fetchPlansController'
import { DeletePlanController } from './deletePlanController'
import { UpdatePlanController } from './updatePlanController'

const router = Router()

router.post('/create-plan', CreatePlanController)

router.get('/fetch-plans', FetchPlansController)

router.delete('/delete-plan', DeletePlanController)

router.patch('/update-plan', UpdatePlanController)

export { router as planRoutes }
