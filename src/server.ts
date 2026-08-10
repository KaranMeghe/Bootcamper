/** @format */

import app from './app';
const PORT = process.env.PORT || 9999;

let server: any;

const startServer = () => {
  server = app.listen(PORT, () => {
    console.log(`Server is running in ${process.env.NODE_ENV}, on port ${PORT}`);
  });
};

startServer();
