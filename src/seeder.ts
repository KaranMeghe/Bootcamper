/** @format */

import fs from 'fs';
import mongoose from 'mongoose';
import 'colors';
import dotenv from 'dotenv';
import BootCamp from './models/bootcampsModel';

dotenv.config();

// Load env variable
const MONGO_URI = process.env.MONGO_URI || '';
// Connect to DB
mongoose.connect(MONGO_URI);

// Read JSON Files
const bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/../_data/bootcamps.json`, 'utf-8'));

// IMPORT INTO DB

export const importData = async () => {
  try {
    await BootCamp.create(bootcamps);
    console.log(`Bootcamp data imported`.green);
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

export const deleteData = async () => {
  try {
    await BootCamp.deleteMany();
    console.log(`Bootcamp data destroyed`.red);
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}
