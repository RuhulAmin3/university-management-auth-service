import mongoose from 'mongoose'
import { app } from './app'
import config from './config/index'
import { errorLogger, successLogger } from './shared/logger'
import { Server } from 'http'

process.on('uncaughtException', err => {
  errorLogger.error(err)
  process.exit(1)
})

let server: Server
async function connectDb() {
  try {
    await mongoose.connect(config.database_url as string)
    successLogger.info('database connected successfully')
    server = app.listen(config.port, () => {
      successLogger.info('server running on port', config.port)
    })
  } catch (err) {
    errorLogger.error('failed to connect database')
  }

  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        errorLogger.error(error)
        process.exit(1)
      })
    } else {
      process.exit(1)
    }
  })
}

connectDb()

process.on('SIGTERM', err => {
  errorLogger.info('SIGTERM is received', err)
  if (server) {
    server.close()
  }
})
