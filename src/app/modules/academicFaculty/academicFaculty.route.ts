import express from 'express';
import {
  createFacultyController,
  getAllFacultiesController,
  getSingleFacultyController,
  updateFacultyController,
  deleteFacultyController,
} from './academicFaculty.controller';
import { validationRequest } from '../../middlewares/validationRequest';
import {
  academicFacultyZodSchema,
  updateAcademicFacultyZodSchema,
} from './academicFaculty.validation';
const router = express.Router();

router.post(
  '/create-faculty',
  validationRequest(academicFacultyZodSchema),
  createFacultyController
);
router.get('/:id', getSingleFacultyController);
router.patch(
  '/:id',
  validationRequest(updateAcademicFacultyZodSchema),
  updateFacultyController
);
router.delete('/:id', deleteFacultyController);
router.get('/', getAllFacultiesController);

export default router;
