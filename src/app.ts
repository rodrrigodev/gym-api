import bodyParser from 'body-parser'
import { createUserController } from 'controllers/userController'
import express from 'express'

export const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.post('/create-user', createUserController)
