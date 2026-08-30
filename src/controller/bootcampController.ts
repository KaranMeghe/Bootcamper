/** @format */

import express, { Request, Response, NextFunction } from 'express';
import BootCamp from '../models/bootcampsModel';
import { AppError } from '../utils/appError';
import asyncHandler from '../middleware/asyncHandler';
import geocoder from '../config/geocoder';

// @desc   Get all bootcamps
// @route  GET /api/v1/bootcamps
// @access Public

export const getAllBootCamps = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  // 1A) Filtering
  // Build Query
  const queryObject = { ...req.query };
  const excludedFields = ['page', 'sort', 'limit', 'fields'];
  excludedFields.forEach((el) => delete queryObject[el]);

  // 1B) Advance Filtering
  let queryStr = JSON.stringify(queryObject);
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, (match) => `$${match}`);
  console.log(JSON.parse(queryStr));

  let query = BootCamp.find(JSON.parse(queryStr));

  // 2) Sort
  let sortBy = typeof req.query.sort === 'string' ? req.query.sort : undefined;
  sortBy = sortBy?.split(',').join(' ');

  if (sortBy) {
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt');
  }

  // 3) Field Limiting
  let fields = typeof req.query.fields === 'string' ? req.query.fields : undefined;
  fields = fields?.split(',').join(' ');

  if (fields) {
    query = query.select(fields);
  } else {
    query = query.select('-__v');
  }

  // Execute Query
  const bootcamps = await query;
  res.status(200).json({ success: true, results: bootcamps.length, data: bootcamps });
});

// @desc   Get single bootcamp
// @route  GET /api/v1/bootcamp/:id
// @access Public
export const getBootCampById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const bootcamp = await BootCamp.findById(req.params.id);
  if (!bootcamp) {
    return next(new AppError(`Bootcamp not found`, 404));
  }
  res.status(200).json({ success: true, data: bootcamp });
});

// @desc   Post bootcamp
// @route  POST /api/v1/bootcamps
// @access Private
export const createBootCamp = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const bootcamp = await BootCamp.create(req.body);
  res.status(201).json({ success: true, data: bootcamp });
});

// @desc   Update bootcamp
// @route  PUT /api/v1/bootcamp/:id
// @access Private

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

// @desc   Delete bootcamp
// @route  DELETE /api/v1/bootcamp/:id
// @access Private

export const deleteBootCamp = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const bootcamp = await BootCamp.findByIdAndDelete(req.params.id);

  if (!bootcamp) {
    return next(new AppError(`Bootcamp not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({ success: true, data: {} });
});

// @desc   Get bootcamps within a radius
// @route GET /api/v1/bootcamps/radius/:zipcode/:distance
// @access Private

export const getBootcampsInRadius = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  // Step 1: Get zipcode and distance from URL
  // Example: /bootcamps/radius/90210/25
  const zipcodeParam = req.params.zipcode;
  const distance = Number(req.params.distance);

  // Handle case where zipcode might be an array (TypeScript safety)
  const zipcode = Array.isArray(zipcodeParam) ? zipcodeParam[0] : zipcodeParam;

  // Step 2: Convert zipcode to latitude and longitude
  // geocoder is the node-geocoder package
  const loc = await geocoder.geocode(zipcode);

  // If geocoder returns empty, throw error
  if (!loc || loc.length === 0) {
    return next(new AppError(`No location found for zipcode ${zipcode}`, 404));
  }

  const lat = loc[0].latitude;
  const lng = loc[0].longitude;

  // Step 3: Convert distance (miles) to radius (radians)
  // Formula: distance in miles ÷ Earth's radius in miles
  const radius = distance / 3963;

  // Step 4: Query MongoDB for bootcamps within the circle
  const bootcamps = await BootCamp.find({
    location: {
      $geoWithin: {
        $centerSphere: [[lng, lat], radius], // Note: longitude FIRST
      },
    },
  });

  // Step 5: Send results back to user
  res.status(200).json({
    success: true,
    count: bootcamps.length,
    data: bootcamps,
  });
});
