import mongoose from 'mongoose'
import app from './app'
import config from './config/index'
import { logger, errorLogger } from './shared/logger'
import { Server } from 'http'

let server: Server

// Handle uncaught exception
process.on('uncaughtException', err => {
  errorLogger.error(err)
  process.exit(1)
})

async function bootstrap() {
  try {
    await mongoose.connect(config.databaseURL as string)
    logger.info('Database connection successful')
    server = app.listen(config.port, () => {
      logger.info(`Example app listening on port ${config.port}`)
    })
  } catch (error) {
    errorLogger.error('Database connection failed', error)
  }
  // Handle unhandled rejection
  process.on('unhandledRejection', err => {
    console.log('unhandledRejection is detected, we are closing our server....')
    if (server) {
      server.close(() => {
        errorLogger.error(err)
        process.exit(1)
      })
    } else {
      process.exit(1)
    }
  })
}

bootstrap()

//Handle SIGTERM

process.on('SIGTERM', () => {
  logger.info('SIGTERM RECEIVED, Shutting down gracefully')
  if (server) {
    server.close()
  }
})
