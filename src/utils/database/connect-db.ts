import { connect } from 'mongoose'

const connectDB = async () => {
  try {
    await connect(process.env.TOKEN_MONGODB || '')
    console.log(`Connected database, successfully 🔌 🔌 🔌`)
  } catch (error) {
    console.log('Error connect database 🔥 🔥 🔥 ==>', error)
  }
}

export { connectDB }
