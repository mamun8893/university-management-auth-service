/* eslint-disable no-unused-expressions */

import { ErrorRequestHandler } from 'express'
import config from '../../config'
import { IGenericErrorMessage } from '../../interfaces/error'
import { handleValidationError } from '../../errors/handleValidationError'
import ApiError from '../../errors/ApiError'
import { errorLogger } from '../../shared/logger'
import { ZodError } from 'zod'
import { handleZodError } from '../../errors/handleZodError'
import { handleCastErrorDB } from '../../errors/handleCastError'

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  config.env === 'development'
    ? console.log('GlobalErrorHandle', err)
    : errorLogger.error('->>>>', err)
  console.log('GlobalErrorHandle', err)

  let statusCode = 500
  let message = 'Something went wrong'
  let errorMessage: IGenericErrorMessage[] = []

  if (err.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessage = simplifiedError.errorMessage
  } else if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessage = simplifiedError.errorMessage
  } else if (err.name === 'CastError') {
    const simplifiedError = handleCastErrorDB(err)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessage = simplifiedError.errorMessage
  } else if (err instanceof ApiError) {
    statusCode = err.statusCode
    message = err.message
    errorMessage = err.message
      ? [
          {
            path: '',
            message: err?.message,
          },
        ]
      : []
  } else if (err instanceof Error) {
    message = err.message
    errorMessage = err.message
      ? [
          {
            path: '',
            message: err?.message,
          },
        ]
      : []
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessage,
    stack: config.env === 'production' ? undefined : err?.stack,
  })
  next()
}

export default globalErrorHandler
