import { Router } from 'express'
import { UpdateGymEquipmentController } from './updateGymEquipmentController'
import { DeleteGymEquipmentController } from './deleteGymEquipmentController'
import { isAuthenticate } from '@/middleware/isAuthenticate'
import { checkUserRole } from '@/middleware/checkUserRole'
import { FetchGymEquipmentController } from './fetchGymEquipmentsController'
import { CreateGymEquipmentController } from './createGymEquipmentController'

const router = Router()

router.post(
  '/create',
  [isAuthenticate, checkUserRole],
  CreateGymEquipmentController,
)

router.get('/all', isAuthenticate, FetchGymEquipmentController)

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
