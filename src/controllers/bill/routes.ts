import { Router } from 'express'
import { CreateBillController } from './createBillController'
import { FetchBillsController } from './fetchBillsController'

const router = Router()

router.post('/create-bill', CreateBillController)

router.get('/fetch-bills', FetchBillsController)

export { router as billRoutes }
