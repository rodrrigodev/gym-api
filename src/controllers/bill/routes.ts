import { Router } from 'express'
import { CreateBillController } from './createBillController'
import { FetchBillsController } from './fetchBillsController'
import { DeleteBillController } from './deleteBillController'
import { UpdateBillController } from './updateBillController'

const router = Router()

router.post('/create-bill', CreateBillController)

router.get('/fetch-bills', FetchBillsController)

router.delete('/delete-bill', DeleteBillController)

router.patch('/update-bill', UpdateBillController)

export { router as billRoutes }
