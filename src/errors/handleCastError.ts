import mongoose from 'mongoose'
import { IGenericErrorMessage } from '../interfaces/error'

export const handleCastErrorDB = (err: mongoose.Error.CastError) => {
  const error: IGenericErrorMessage[] = [
    {
      path: err.path,
      message: `Invalid ${err.path}: ${err.value}`,
    },
  ]

  const statusCode = 400

  return {
    statusCode,
    message: `Invalid ${err.path}: ${err.value}`,
    errorMessage: error,
  }
}
