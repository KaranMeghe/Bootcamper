/** @format */

import express, { Request, Response, NextFunction, Router } from 'express';

const router = Router();

// get all bootcamps
router.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ success: true, message: 'Show all Bootcamps' });
});

// get single bootcamp
router.get('/:id', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ success: true, message: `Show bootcamp with id ${req.params.id}` });
});

// create bootcamp
router.post('/', (req: Request, res: Response, next: NextFunction) => {
  res.status(201).json({ success: true, message: 'Create a new bootcamp' });
});

// Update a bootcamp
router.put('/:id', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ sucess: true, message: `Bootcamp id: ${req.params.id} is updated` });
});

// delete a bootcamp
router.delete('/:id', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ sucess: true, message: `Bootcamp id: ${req.params.id} is deleted` });
});

export default router;
