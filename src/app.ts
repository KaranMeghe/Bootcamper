/** @format */
import 'dotenv/config';

import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import bootcampsRouter from './router/bootcampRoute';
import { AppError } from './utils/appError';
import { globalErrorHandler } from './controller/globalErrorController';

const app = express();

// Restore Express 4-style query parsing (nested objects via brackets)
app.set('query parser', 'extended');

// Body parser
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1/bootcamps', bootcampsRouter);

app.all(/.*/, (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Cant find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

export default app;
