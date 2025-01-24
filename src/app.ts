import 'dotenv/config'
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

export const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())

app.use('/', userRoutes)

app.use('/', userProgressRoutes)

app.use('/', billRoutes)

app.use('/', activityRoutes)

app.use('/', planRoutes)

app.use('/', [isAuthenticate, checkUserRole], prizeDrawRoutes)

app.use(errorHandler)
