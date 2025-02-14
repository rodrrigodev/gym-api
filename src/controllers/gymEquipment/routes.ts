import { Router } from 'express'
import { CreateGymEquipmentController } from './createGymEquipmentController'
import { UpdateGymEquipmentController } from './updateGymEquipmentController'
import { FetchGym equipmentController } from './fetchGym equipmentController'
import { DeleteGymEquipmentController } from './deleteGymEquipmentController'
import { isAuthenticate } from '@/middleware/isAuthenticate'
import { checkUserRole } from '@/middleware/checkUserRole'

const router = Router()

router.post(
  '/create',
  [isAuthenticate, checkUserRole],
  CreateGymEquipmentController,
)

router.get('/all', isAuthenticate, FetchGym equipmentController)

router.patch(
  '/update',
  [isAuthenticate, checkUserRole],
  UpdateGymEquipmentController,
)

router.delete(
  '/delete',
  [isAuthenticate, checkUserRole],
  DeleteGymEquipmentController,
)

export { router as gymEquipmentRoutes }
