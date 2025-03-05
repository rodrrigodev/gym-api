import { Router } from 'express'
import { CreateTrainingController } from './createTrainingController'
import { UpdateTrainingController } from './updateTrainingController'
import { DeleteTrainingController } from './deleteTrainingController'
import { FetchTrainingController } from './fetchTrainingController'

const router = Router()

router.post('/create', CreateTrainingController)

router.patch('/update', UpdateTrainingController)

router.get('/all', FetchTrainingController)

router.delete('/delete', DeleteTrainingController)

export { router as trainingRoutes }
