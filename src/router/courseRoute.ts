/** @format */

import { Router } from 'express';
import { getCourses } from '../controller/coursesController';

const router = Router({ mergeParams: true });

router.route('/').get(getCourses);
router.route('/:id/courses').get(getCourses);

export default router;
