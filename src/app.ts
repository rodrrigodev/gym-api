import bodyParser from 'body-parser'
import express from 'express'
import { errorHandler } from './middleware/errorHandler'
import 'dotenv/config'
import { createUserController } from './controllers/userController'

export const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/create-user', createUserController)

app.use(errorHandler)
