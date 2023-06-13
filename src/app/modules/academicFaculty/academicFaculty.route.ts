import express from 'express';
import { createFacultyController } from './academicFaculty.controller';
import { validationRequest } from '../../middlewares/validationRequest';
import { academicFacultyZodSchema } from './academicFaculty.validation';
const router = express.Router();

router.post(
  '/create-faculty',
  validationRequest(academicFacultyZodSchema),
  createFacultyController
);

export default router;
