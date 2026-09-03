/** @format */
import { Request, Response, NextFunction } from 'express';
import asyncHandler from '../middleware/asyncHandler';
// import AppError from '../utils/appError';
import Course from '../models/coursesModel';

// @desc   Get all courses
// @route  GET /api/v1/courses
// @route  GET /api/v1/bootcamps/:bootcampId/courses
// @access Public

export const getCourses = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  let query;

  if (req.params.bootcampID) {
    query = Course.find({ bootcamp: req.params.bootcampID });
  } else {
    query = Course.find();
  }

  const courses = await query;
  res.status(200).json({
    success: true,
    count: courses.length,
    data: courses,
  });
});
