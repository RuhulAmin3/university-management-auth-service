import express from 'express';
import { validationRequest } from '../../middlewares/validationRequest';
import {
  academicSemesterZodSchema,
  updateAcademicSemesterZodSchema,
} from './academicSemester.validation';
import {
  createAcademicSemesterController,
  getAllSemestersController,
  getSingleSemesterController,
  updateSemesterController,
  deleteSemesterController,
} from './academicSemester.controller';

const router = express.Router();

router.post(
  '/create-semester',
  validationRequest(academicSemesterZodSchema),
  createAcademicSemesterController
);

router.get('/:id', getSingleSemesterController);
router.patch(
  '/:id',
  validationRequest(updateAcademicSemesterZodSchema),
  updateSemesterController
);
router.delete('/:id', deleteSemesterController);
router.get('/', getAllSemestersController);
export default router;
