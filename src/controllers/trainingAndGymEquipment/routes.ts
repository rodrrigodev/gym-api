import { Router } from 'express'
import { createTrainingAndGymEquipmentController } from './createTrainingAndGymEquipmentController'
import { DeleteTrainingAndGymEquipmentController } from './deleteTrainingAndGymEquipmentController'
import { FetchTrainingAndGymEquipmentController } from './fetchTrainingAndGymEquipmentController'

const router = Router()

router.post('/create', createTrainingAndGymEquipmentController)

router.get('/:id', FetchTrainingAndGymEquipmentController)

router.delete('/delete', DeleteTrainingAndGymEquipmentController)

export { router as trainingAndGymEquipmentRoutes }
