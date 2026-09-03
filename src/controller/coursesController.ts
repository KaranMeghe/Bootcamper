/** @format */
import { Request, Response, NextFunction } from 'express';
import asyncHandler from '../middleware/asyncHandler';
import { AppError } from '../utils/appError';
import Course from '../models/coursesModel';
import BootCamp from '../models/bootcampsModel';

// @desc   Get all courses
// @route  GET /api/v1/courses
// @route  GET /api/v1/bootcamps/:bootcampId/courses
// @access Public

export const getCourses = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  let query;

  if (req.params.bootcampID) {
    query = Course.find({ bootcamp: req.params.bootcampID });
  } else {
    query = Course.find().populate({
      path: 'bootcamp',
      select: 'name description',
    });
  }

  const courses = await query;
  res.status(200).json({
    success: true,
    count: courses.length,
    data: courses,
  });
});

// @desc   Get course by id
// @route  GET /api/v1/courses/:id
// @access Public

export const getSingleCourse = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const course = await Course.findById(req.params.id).populate({
    path: 'bootcamp',
    select: 'name description',
  });

  if (!course) {
    return next(new AppError(`Course not found`, 404));
  }

  res.status(200).json({ success: true, data: course });
});

// @desc   Create a course
// @route  POST /api/v1/courses
// @access Private

export const createCourse = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  req.params.bootcampID && (req.body.bootcamp = req.params.bootcampID);
  const bootcamp = await BootCamp.findById(req.body.bootcamp);
  if (!bootcamp) {
    return next(new AppError(`Bootcamp not found`, 404));
  }

  const course = await Course.create(req.body);
  res.status(201).json({ success: true, data: course });
});

// @desc   Update course by id
// @route  PUT /api/v1/courses/:id
// @access Private

export const updateCourse = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!course) {
    return next(new AppError(`Course not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({ success: true, data: course });
});

// @desc   Delete course by id
// @route  DELETE /api/v1/courses/:id
// @access Private

export const deleteCourse = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    return next(new AppError(`Course not found with id of ${req.params.id}`, 404));
  }

  await course.deleteOne();

  res.status(200).json({ success: true, data: {} });
});
