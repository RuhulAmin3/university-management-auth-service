import mongoose from 'mongoose'
import { app } from './app'
import config from './config/index'

async function connectDb() {
  try {
    await mongoose.connect(config.database_url as string)
    console.log('database connected successfully')
    app.listen(config.port, () => {
      console.log('server running on port', config.port)
    })
  } catch (err) {
    console.log('failed to connect database')
  }
}

connectDb()
