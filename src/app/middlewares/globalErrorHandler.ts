/* eslint-disable no-unused-expressions */
import { ErrorRequestHandler } from 'express'
import config from '../../config'
import { IGenericErrMessage } from '../../interfaces/error'
import { handleValidationError } from '../../errors/handleValidationError'
import ApiError from '../../errors/ApiError'
import { errorLogger } from '../../shared/logger'

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  config.env === 'development'
    ? console.log('global error handler', err)
    : errorLogger.error('global error handler', err)

  let statusCode = 500
  let message = 'something went wrong'
  let errorMessages: IGenericErrMessage[] = []

  if (err?.name === 'ValidationError') {
    // validation Error handler
    const simplifiedError = handleValidationError(err)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessages = simplifiedError.errorMessages
  } else if (err instanceof ApiError) {
    statusCode = err.statusCode
    message = err.message
    errorMessages = err?.message ? [{ path: '', message: err?.message }] : []
  } else if (err instanceof Error) {
    message = err?.message
    errorMessages = err?.message ? [{ path: '', message: err?.message }] : []
  }

  //   generic error format send for frontend;
  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? err?.stack : undefined,
  })
}

export default globalErrorHandler
