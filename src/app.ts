import bodyParser from 'body-parser'
import express from 'express'
import { errorHandler } from './middleware/errorHandler'
import 'dotenv/config'
import { createUserController } from './controllers/createUserController'
import { deleteUserController } from './controllers/deleteUserController'
import { UpdateUserController } from './controllers/updateUserController'
import { FetchUsersOrSearchController } from './controllers/fetchUsersOrSearchController'
import { createUserProgressController } from './controllers/createUserProgressController'

export const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/create-user', createUserController)

app.delete('/delete-user', deleteUserController)

app.delete('/update-user', UpdateUserController)

app.get('/users', FetchUsersOrSearchController)

app.post('/create-progress', createUserProgressController)

app.use(errorHandler)
