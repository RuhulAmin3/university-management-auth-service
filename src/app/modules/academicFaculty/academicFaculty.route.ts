import express from 'express';
import {
  createAcademicFacultyController,
  getAllAcademicFacultiesController,
  getSingleAcademicFacultyController,
  updateFacultyFacultyController,
  deleteAcademicFacultyController,
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
  createAcademicFacultyController
);
router.get('/:id', getSingleAcademicFacultyController);
router.patch(
  '/:id',
  validationRequest(updateAcademicFacultyZodSchema),
  updateFacultyFacultyController
);
router.delete('/:id', deleteAcademicFacultyController);
router.get('/', getAllAcademicFacultiesController);

export default router;
