import { Router } from 'express'
import { CreateEquipmentTrackingController } from './createEquipmentTrackingController'
import { DeleteEquipmentTrackingController } from './deleteEquipmentTrackingController'
import { UpdateEquipmentTrackingController } from './updateEquipmentTrackingController'
import { isAuthenticate } from '@/middleware/isAuthenticate'

const router = Router()

router.post('/create', isAuthenticate, CreateEquipmentTrackingController)

router.delete('/delete', isAuthenticate, DeleteEquipmentTrackingController)

router.patch('/update', isAuthenticate, UpdateEquipmentTrackingController)

export { router as equipmentTracking }
