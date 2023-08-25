import express from 'express'

import { router } from './router/router'

import dotenv from 'dotenv'
dotenv.config()

const app = express()

app.use(express.json())

app.use('/', router)

app.get('*', (request, response) => {
  response.send('🔥 4 0 4 🔥')
})

export default app
