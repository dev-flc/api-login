import app from './app'

const { PORT } = process.env
const NEW_PORT = PORT || 3002

app.listen(NEW_PORT, async () => {
  console.log(`Server successfull: http://localhost:${NEW_PORT}`)
})
