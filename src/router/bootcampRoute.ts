/** @format */
import { Router } from 'express';
import {
  getAllBootCamps,
  getBootCampById,
  createBootCamp,
  updateBootCamp,
  deleteBootCamp,
} from '../controller/bootcampController';

const router = Router();

router.route('/').get(getAllBootCamps).post(createBootCamp);
router.route('/:id').get(getBootCampById).put(updateBootCamp).delete(deleteBootCamp);

export default router;
