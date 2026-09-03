/** @format */
import { Router } from 'express';
import {
  getAllBootCamps,
  getBootCampById,
  createBootCamp,
  updateBootCamp,
  deleteBootCamp,
  getBootcampsInRadius,
} from '../controller/bootcampController';

// Include outher resources router
import courseRouter from './courseRoute';

const router = Router();

// Re-route into other resource routers
router.use('/:bootcampID/courses', courseRouter); //(basically passes down to course router, rather than bringing getCourses in this router)

router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);
router.route('/').get(getAllBootCamps).post(createBootCamp);
router.route('/:id').get(getBootCampById).put(updateBootCamp).delete(deleteBootCamp);

export default router;
