/** @format */

import express, { Request, Response, NextFunction } from 'express';

export const getAllBootCamps = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ success: true, message: 'Show all Bootcamps' });
};

export const getBootCampById = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ success: true, message: `Show bootcamp with id ${req.params.id}` });
};

export const createBootCamp = (req: Request, res: Response, next: NextFunction) => {
  res.status(201).json({ success: true, message: 'Create a new bootcamp' });
};

export const updateBootCamp = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ success: true, message: `Bootcamp id: ${req.params.id} is updated` });
};

export const deleteBootCamp = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ success: true, message: `Bootcamp id: ${req.params.id} is deleted` });
};
