import { Router } from 'express'
import { CreateBillController } from './createBillController'
import { FetchBillsController } from './fetchBillsController'
import { DeleteBillController } from './deleteBillController'
import { UpdateBillController } from './updateBillController'
import { GenerateBillsFileController } from './generateBillsFileController'

const router = Router()

router.post('/create', CreateBillController)

router.get('/all', FetchBillsController)

router.delete('/delete', DeleteBillController)

router.patch('/update', UpdateBillController)

router.get('/generate', GenerateBillsFileController)

export { router as billRoutes }
