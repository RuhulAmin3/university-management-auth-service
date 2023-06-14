import express from 'express';
import {
  createDepartmentController,
  deleteDepartmentController,
  getAllDepartmentController,
  getSingleDepartmentController,
  updateDepartmentController,
} from './academicDepartment.controller';
import { validationRequest } from '../../middlewares/validationRequest';
import {
  academicDepartmentZodSchema,
  updateAcademicDepartmentZodScheme,
} from './academicDepartment.validation';
const router = express.Router();

router.post(
  '/create-department',
  validationRequest(academicDepartmentZodSchema),
  createDepartmentController
);

router.patch(
  '/:id',
  validationRequest(updateAcademicDepartmentZodScheme),
  updateDepartmentController
);

router.get('/:id', getSingleDepartmentController);
router.delete('/:id', deleteDepartmentController);
router.get('/', getAllDepartmentController);

export default router;
