import bodyParser from 'body-parser'
import express from 'express'
import { errorHandler } from './middleware/errorHandler'
import 'dotenv/config'
import { createUserController } from './controllers/createUserController'
import { deleteUserController } from './controllers/deleteUserController'

export const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/create-user', createUserController)

app.delete('/delete-user', deleteUserController)

app.use(errorHandler)
