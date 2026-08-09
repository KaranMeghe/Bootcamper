/** @format */

import dotenv from 'dotenv';
import app from './app';

// Load env vars
dotenv.config({ path: './src/config/config.env' });

const PORT = process.env.PORT || 9999;

let server: any;

const startServer = () => {
  server = app.listen(PORT, () => {
    console.log(`Server is running in ${process.env.NODE_ENV}, on port ${PORT}`);
  });
};

startServer();
