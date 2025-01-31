import { Router } from 'express'
import { CreatePlanController } from './createPlanController'
import { FetchPlansController } from './fetchPlansController'
import { DeletePlanController } from './deletePlanController'
import { UpdatePlanController } from './updatePlanController'

const router = Router()

router.post('/create', CreatePlanController)

router.get('/all', FetchPlansController)

router.delete('/delete', DeletePlanController)

router.patch('/update', UpdatePlanController)

export { router as planRoutes }
