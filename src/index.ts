import express from 'express'

const { PORT } = process.env
const NEW_PORT = PORT || 3002
const APP = express()

APP.use(express.json())

APP.get('*', (request, response) => {
  response.send('🔥 4 0 4 🔥')
})

APP.listen(NEW_PORT, async () => {
  console.log(`Server successfull: http://localhost:${NEW_PORT}`)
})
