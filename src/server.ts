/** @format */

import app from './app';
import 'colors';

import { connectDB } from './config/db';
const PORT = process.env.PORT || 9999;
const MONGO_URI = process.env.MONGO_URI || '';

let server: any;

// unhandled promise rejection
process.on('unhandledRejection', (err: any) => {
  console.log('UNHANDLED REJECTION 💥 Shutting down...'.red);
  console.log(`Error: ${err.name} | ${err.message}`.red);
  // close the server and exit the process
  if (server) {
    server.close(() => process.exit(1));
  } else {
    process.exit(1);
  }
});

// start the server and connect to the database
const startServer = async () => {
  await connectDB(MONGO_URI);

  // Only start the server if db is connected
  server = app.listen(PORT, () => {
    console.log(`Server is running in ${process.env.NODE_ENV} mode, on port ${PORT}`.green);
  });
};

startServer();
