import { Router } from 'express'
import { CreateEquipmentTrackingController } from './createEquipmentTrackingController'
import { DeleteEquipmentTrackingController } from './deleteEquipmentTrackingController'
import { UpdateEquipmentTrackingController } from './updateEquipmentTrackingController'

const router = Router()

router.post('/create-equipment-tracking', CreateEquipmentTrackingController)

router.delete('/delete-equipment-tracking', DeleteEquipmentTrackingController)

router.patch('/update-equipment-tracking', UpdateEquipmentTrackingController)

export { router as equipmentTracking }
