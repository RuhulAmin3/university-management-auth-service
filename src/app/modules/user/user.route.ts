import express from 'express';
import {
  createStudentController,
  createFacultyController,
} from './user.controller';
import { validationRequest } from '../../middlewares/validationRequest';
import {
  createStudentZodSchema,
  createFacultyZodSchema,
} from './user.validation';
const router = express.Router();

router.post(
  '/create-student',
  validationRequest(createStudentZodSchema),
  createStudentController
);

router.post(
  '/create-faculty',
  validationRequest(createFacultyZodSchema),
  createFacultyController
);

export default router;
