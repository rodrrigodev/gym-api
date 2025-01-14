import 'dotenv/config'
import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'

import { errorHandler } from './middleware/errorHandler'
import { userRoutes } from './controllers/user/routes'
import { prizeDrawRoutes } from './controllers/prizeDraw/routes'
import { checkUserRole } from './middleware/checkUserRole'
import { isAuthenticate } from './middleware/isAuthenticate'

export const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())

app.use('/', userRoutes)

app.use('/', [isAuthenticate, checkUserRole], prizeDrawRoutes)

app.use(errorHandler)
