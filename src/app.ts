import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'

import { errorHandler } from './middleware/errorHandler'
import { userRoutes } from './controllers/user/routes'
import { prizeDrawRoutes } from './controllers/prizeDraw/routes'
import { checkUserRole } from './middleware/checkUserRole'
import { isAuthenticate } from './middleware/isAuthenticate'
import { userProgressRoutes } from './controllers/userProgress/routes'
import { activityRoutes } from './controllers/activity/routes'
import { billRoutes } from './controllers/bill/routes'
import { planRoutes } from './controllers/plan/routes'
import { gymEquipmentRoutes } from './controllers/gymEquipment/routes'
import { equipmentTracking } from './controllers/equipmentTracking/routes'

export const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())

app.use('/user', userRoutes)

app.use('/progress', isAuthenticate, userProgressRoutes)

app.use('/bill', [isAuthenticate, checkUserRole], billRoutes)

app.use('/activity', isAuthenticate, activityRoutes)

app.use('/plan', [isAuthenticate, checkUserRole], planRoutes)

app.use('/equipment', gymEquipmentRoutes)

app.use('/tracking', equipmentTracking)

app.use('/prize', [isAuthenticate, checkUserRole], prizeDrawRoutes)

app.use(errorHandler)
