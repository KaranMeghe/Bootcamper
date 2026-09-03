/** @format */

import { Router } from 'express';
import { createCourse, deleteCourse, getCourses, getSingleCourse, updateCourse } from '../controller/coursesController';

const router = Router({ mergeParams: true });

router.route('/').get(getCourses).post(createCourse);
router.route('/:id').get(getSingleCourse).put(updateCourse).delete(deleteCourse);
router.route('/:id/courses').get(getCourses);

export default router;
