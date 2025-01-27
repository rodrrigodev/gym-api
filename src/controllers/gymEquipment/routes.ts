import { Router } from 'express'
import { CreateGymEquipmentController } from './createGymEquipmentController'
import { UpdateGymEquipmentController } from './updateGymEquipmentController'
import { FetchGymEquipmentsController } from './fetchGymEquipmentsController'
import { DeleteGymEquipmentController } from './deleteGymEquipmentController'

const router = Router()

router.post('/create-gym-equipment', CreateGymEquipmentController)

router.get('/fetch-gym-equipments', FetchGymEquipmentsController)

router.patch('/update-gym-equipment', UpdateGymEquipmentController)

router.delete('/delete-gym-equipment', DeleteGymEquipmentController)

export { router as gymEquipmentRoutes }
