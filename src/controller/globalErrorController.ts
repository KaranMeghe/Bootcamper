/** @format */
import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/appError';

// Handle MongoDB cast errors when invalid ID format is provided
const handleCastErrorDB = (error: any) => {
  const message = `Resource not found with id of ${error.value}`;
  return new AppError(message, 404);
};

// Handle duplicate field errors from MongoDB unique index violations
const handleDuplicateFieldsDB = (error: any) => {
  const value = error.message.match(/(["'])(\\?.)*?\1/)?.[0] ?? 'unknown';
  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 400);
};

// Mongoose validation error
const handleValidationErrorDB = (error: any) => {
  const errors = Object.values(error.errors ?? {}).map((el: any) => el.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

// Return safe error information in production environment
const handleProdError = (error: AppError, res: Response) => {
  // operational error, trusted error: send message to client
  if (error.isOperational) {
    return res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
    });
  }
  // Programming or other unknown error: don't leak error details
  else {
    console.error('ERROR', error);
    return res.status(500).json({
      status: 'error',
      message: 'Something went wrong',
    });
  }
};

// Return detailed error information in development environment
const handleDevError = (error: AppError, res: Response) => {
  return res.status(error.statusCode).json({
    status: error.status,
    error: error,
    message: error.message,
    stack: error.stack,
  });
};

// Global error handler middleware to process and respond to all application errors
export const globalErrorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || 'Server Error';

  // Transform known errors FIRST (before dev/prod split)
  let handledError = error;
  // Log console for dev
  console.log('NativeError:', error);

  // CastError
  if (error.name === 'CastError') {
    handledError = handleCastErrorDB(error);
  }

  // Duplicalte Fields
  if (error.code === 11000) {
    handledError = handleDuplicateFieldsDB(error);
  }

  // Validation Error
  if (error.name === 'ValidationError') {
    handledError = handleValidationErrorDB(error);
  }

  // Production and Devlopment error handling
  if (process.env.NODE_ENV === 'development') {
    handleDevError(handledError, res);
  } else if (process.env.NODE_ENV === 'production') {
    handleProdError(handledError, res);
  }
};
