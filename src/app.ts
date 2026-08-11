/** @format */
import 'dotenv/config';

import express from 'express';
import morgan from 'morgan';
import bootcampsRouter from './router/bootcampRoute';

const app = express();

// Body parser
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1/bootcamps', bootcampsRouter);

export default app;
