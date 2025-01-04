import 'dotenv/config'
import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'

import { errorHandler } from './middleware/errorHandler'
import { userRoutes } from './controllers/user/routes'

export const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())

app.use('/', userRoutes)

app.use(errorHandler)
