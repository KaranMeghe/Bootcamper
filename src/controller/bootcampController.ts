/** @format */

import express, { Request, Response, NextFunction } from 'express';
import BootCamp from '../models/bootcampsModel';
import { AppError } from '../utils/appError';
import asyncHandler from '../middleware/asyncHandler';

// get all bootcamps
export const getAllBootCamps = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const bootcamps = await BootCamp.find();
  res.status(200).json({ success: true, data: bootcamps });
});

// get single bootcamp
export const getBootCampById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const bootcamp = await BootCamp.findById(req.params.id);
  if (!bootcamp) {
    return next(new AppError(`Bootcamp not found`, 404));
  }
  res.status(200).json({ success: true, data: bootcamp });
});

// create bootcamp
export const createBootCamp = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const bootcamp = await BootCamp.create(req.body);
  res.status(201).json({ success: true, data: bootcamp });
});

// updatebootcamp
export const updateBootCamp = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const bootcamp = await BootCamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!bootcamp) {
    return next(new AppError(`Bootcamp not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({ success: true, data: bootcamp });
});

// delete bootcamp
export const deleteBootCamp = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const bootcamp = await BootCamp.findByIdAndDelete(req.params.id);

  if (!bootcamp) {
    return next(new AppError(`Bootcamp not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({ success: true, data: {} });
});
