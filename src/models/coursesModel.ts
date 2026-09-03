/** @format */

import mongoose, { Schema, Document } from 'mongoose';
import { ICourse } from '../types/courseType';

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
    ref: 'Bootcamp',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Course = mongoose.model<ICourseDocument>('Course', coursesSchema);
export default Course;
