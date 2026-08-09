/** @format */

import express from 'express';
import bootcampsRouter from './router/bootcampRoute';

const app = express();

app.use('/api/v1/bootcamps', bootcampsRouter);

export default app;
