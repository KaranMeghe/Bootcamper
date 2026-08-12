/** @format */

import express, { Request, Response, NextFunction } from 'express';
import BootCamp from '../models/bootcampsModel';

// get all bootcamps
export const getAllBootCamps = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bootcamps = await BootCamp.find();
    res.status(200).json({ success: true, count: bootcamps.length, data: bootcamps });
  } catch (err) {
    res.status(400).json({ sucess: false });
  }
};

// get single bootcamp
export const getBootCampById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bootcamp = await BootCamp.findById(req.params.id);
    if (!bootcamp) {
      return res.status(400).json({ sucess: false });
    }
    res.status(200).json({ success: true, data: bootcamp });
  } catch (err) {
    res.status(400).json({ sucess: false });
  }
};

// create bootcamp
export const createBootCamp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bootcamp = await BootCamp.create(req.body);
    console.log(req.body);
    res.status(201).json({ success: true, data: bootcamp });
  } catch (err) {
    res.status(400).json({ success: false, error: err });
  }
};

// updatebootcamp
export const updateBootCamp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bootcamp = await BootCamp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!bootcamp) return res.status(400).json({ success: false });

    res.status(200).json({ success: true, data: bootcamp });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false, err: err });
  }
};

// delete bootcamp
export const deleteBootCamp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bootcamp = await BootCamp.findByIdAndDelete(req.params.id);

    if (!bootcamp) return res.status(400).json({ success: false });

    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false, err: err });
  }
};
