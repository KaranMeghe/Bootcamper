/** @format */

import fs from 'fs';
import mongoose from 'mongoose';
import 'colors';
import dotenv from 'dotenv';
import BootCamp from './models/bootcampsModel';
import Course from './models/coursesModel';

dotenv.config();

// Load env variable
const MONGO_URI = process.env.MONGO_URI || '';
// Connect to DB
mongoose.connect(MONGO_URI);

// Read JSON Files
const bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/../_data/bootcamps.json`, 'utf-8'));
const courses = JSON.parse(fs.readFileSync(`${__dirname}/../_data/courses.json`, 'utf-8'));

// IMPORT INTO DB
export const importData = async () => {
  try {
    await BootCamp.create(bootcamps);
    await Course.create(courses);
    console.log(`Bootcamp data imported`.green);
    console.log(`Course data imported`.green);
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

export const deleteData = async () => {
  try {
    await BootCamp.deleteMany();
    await Course.deleteMany();
    console.log(`Bootcamp data destroyed`.red);
    console.log(`Course data destroyed`.red);
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
