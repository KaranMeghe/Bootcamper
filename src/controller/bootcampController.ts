/** @format */

import express, { Request, Response, NextFunction } from 'express';
import BootCamp from '../models/bootcampsModel';

export const getAllBootCamps = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ success: true, message: 'Show all Bootcamps' });
};

export const getBootCampById = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ success: true, message: `Show bootcamp with id ${req.params.id}` });
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

export const updateBootCamp = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ success: true, message: `Bootcamp id: ${req.params.id} is updated` });
};

export const deleteBootCamp = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ success: true, message: `Bootcamp id: ${req.params.id} is deleted` });
};
