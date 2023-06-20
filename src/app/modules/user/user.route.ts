import express from 'express';
import {
  createStudentController,
  createFacultyController,
  createAdminController,
} from './user.controller';
import { validationRequest } from '../../middlewares/validationRequest';
import {
  createStudentZodSchema,
  createFacultyZodSchema,
  createAdminZodSchema,
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

router.post(
  '/create-admin',
  validationRequest(createAdminZodSchema),
  createAdminController
);

export default router;
