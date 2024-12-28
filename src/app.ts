import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'

import { errorHandler } from './middleware/errorHandler'
import 'dotenv/config'
import { createUserController } from './controllers/createUserController'
import { UpdateUserController } from './controllers/updateUserController'
import { FetchUsersOrSearchController } from './controllers/fetchUsersOrSearchController'
import { createUserProgressController } from './controllers/createUserProgressController'
import { authenticateController } from './controllers/authenticateController'
import { isAuthenticate } from './middleware/isAuthenticate'
import { refreshTokenController } from './controllers/refreshTokenController'

export const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())

app.post('/create-user', isAuthenticate, createUserController)

app.post('/refresh-token', refreshTokenController)

app.delete('/update-user', UpdateUserController)

app.get('/users', FetchUsersOrSearchController)

app.post('/create-progress', createUserProgressController)

app.post('/login', authenticateController)

app.use(errorHandler)
