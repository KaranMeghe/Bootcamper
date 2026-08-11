/** @format */

import mongoose from 'mongoose';
import 'colors';

export const connectDB = async (connectionString: string): Promise<void> => {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to MongoDB ✅'.green);
  } catch (error) {
    console.log('Database connection failed ❌'.red, error);
    throw error;
  }
};
