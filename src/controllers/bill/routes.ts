import { Router } from 'express'
import { CreateBillController } from './createBillController'

const router = Router()

router.post('/create-bill', CreateBillController)

export { router as billRoutes }
