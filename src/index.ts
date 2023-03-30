import express from 'express'
import { connectDB } from './utils/database/connect-db'
import { router } from './router/router'

import dotenv from 'dotenv'
dotenv.config()

const { PORT } = process.env
const NEW_PORT = PORT || 3002
const APP = express()

APP.use(express.json())

APP.use('/', router)

APP.get('*', (request, response) => {
  response.send('🔥 4 0 4 🔥')
})

APP.listen(NEW_PORT, async () => {
  connectDB()
  console.log(`Server successfull: http://localhost:${NEW_PORT}`)
})
