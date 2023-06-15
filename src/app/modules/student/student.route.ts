import express from 'express';
import {
  deleteStudentController,
  getAllStudentsController,
  getSingleStudentController,
  updateStudentController,
} from './student.controller';
import { validationRequest } from '../../middlewares/validationRequest';
import { updateStudentZodSchema } from './student.validation';
const router = express.Router();

router.get('/:id', getSingleStudentController);
router.delete('/:id', deleteStudentController);
router.patch(
  '/:id',
  validationRequest(updateStudentZodSchema),
  updateStudentController
);
router.get('/', getAllStudentsController);

export default router;
