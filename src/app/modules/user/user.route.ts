import express from 'express';
import { createStudentController } from './user.controller';
import { validationRequest } from '../../middlewares/validationRequest';
import { createUserZodSchema } from './user.validation';
const router = express.Router();

router.post(
  '/create-student',
  validationRequest(createUserZodSchema),
  createStudentController
);

export default router;
