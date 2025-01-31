import { Router } from 'express'
import { DrawParticipantWinnerController } from './drawParticipantWinnerController'
import { CreatePrizeDrawController } from './createPrizeDrawController'
import { FetchPrizeDrawsControllers } from './fetchPrizeDrawsControllers'
import { UpdatePrizeDrawController } from './updatePrizeDrawController'

const router = Router()

router.get('/all', FetchPrizeDrawsControllers)

router.post('/create', CreatePrizeDrawController)

router.post('/draw', DrawParticipantWinnerController)

router.patch('/update', UpdatePrizeDrawController)

export { router as prizeDrawRoutes }
