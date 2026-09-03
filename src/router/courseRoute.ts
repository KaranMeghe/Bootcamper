/** @format */

import { Router } from 'express';
import { createCourse, getCourses, getSingleCourse } from '../controller/coursesController';

const router = Router({ mergeParams: true });

router.route('/').get(getCourses).post(createCourse);
router.route('/:id').get(getSingleCourse);
router.route('/:id/courses').get(getCourses);

export default router;
