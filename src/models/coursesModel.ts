/** @format */

import mongoose, { Schema, Document } from 'mongoose';
import { ICourse } from '../types/courseType';
import BootCamp from './bootcampsModel';

export interface ICourseDocument extends ICourse, Document {}

const coursesSchema = new Schema<ICourse>({
  title: {
    type: String,
    required: [true, 'Please add a course title'],
    unique: true,
    trim: true,
    maxlength: [50, 'Title can not be more than 50 charaters'],
  },
  description: {
    type: String,
    required: [true, 'Please add a course description'],
    trim: true,
    maxlength: [300, 'Description can not be more than 300 charaters'],
  },
  weeks: {
    type: Number,
    required: [true, 'Please add number of weeks'],
  },
  tuition: {
    type: Number,
    required: [true, 'Please add a tuition cost'],
  },
  minimumSkill: {
    type: String,
    required: [true, 'Please add a minimum skill'],
    enum: ['beginner', 'intermediate', 'advanced'],
  },
  scholarshipsAvailable: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  bootcamp: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BootCamp',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

// Static method to get average of course tuitions
// coursesSchema.statics.getAverageCost = async function (bootcampId: string) {
//   const obj = await this.aggregate([
//     {
//       $match: { bootcamp: bootcampId },
//     },
//     {
//       $group: {
//         _id: '$bootcamp',
//         averageCost: { $avg: '$tuition' },
//       },
//     },
//   ]);
//   return obj[0]?.averageCost;
// };

// Call getAverageCost after save
coursesSchema.post('save', async function () {
  await updateBootcampAverage(this.bootcamp.toString());
});

// Call getAverageCost before remove
coursesSchema.pre('deleteOne', async function () {
  const bootcamp = this.getFilter().bootcamp;
  if (bootcamp) {
    await updateBootcampAverage(bootcamp.toString());
  }
});

// Update the average cost of a bootcamp
async function updateBootcampAverage(bootcampId: string) {
  const average = await Course.aggregate([
    { $match: { bootcamp: new mongoose.Types.ObjectId(bootcampId) } },
    { $group: { _id: null, avgCost: { $avg: '$tuition' } } },
  ]);

  const avgCost = average[0]?.avgCost || 0;
  await BootCamp.findByIdAndUpdate(bootcampId, { averageCost: avgCost });
}

const Course = mongoose.model<ICourse>('Course', coursesSchema);
export default Course;
