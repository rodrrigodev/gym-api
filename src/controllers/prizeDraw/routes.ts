import { Router } from 'express'
import { DrawParticipantWinnerController } from './drawParticipantWinnerController'
import { CreatePrizeDrawController } from './createPrizeDrawController'
import { FetchPrizeDrawsControllers } from './fetchPrizeDrawsControllers'
import { UpdatePrizeDrawController } from './updatePrizeDrawController'

const router = Router()

router.get('/prize-draws', FetchPrizeDrawsControllers)

router.post('/create-prize', CreatePrizeDrawController)

router.post('/draw-participant', DrawParticipantWinnerController)

router.patch('/update-prize', UpdatePrizeDrawController)

export { router as prizeDrawRoutes }
