import mongoose from 'mongoose'
import app from './app'
import config from './config/index'
import { logger, errorLogger } from './shared/logger'

async function bootstrap() {
  try {
    await mongoose.connect(config.databaseURL as string)
    logger.info('Database connection successful')
    app.listen(config.port, () => {
      logger.info(`Example app listening on port ${config.port}`)
    })
  } catch (error) {
    errorLogger.error('Database connection failed', error)
  }
}

bootstrap()
