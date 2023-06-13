import express from 'express';
import { createUserController } from './user.controller';
import { validationRequest } from '../../middlewares/validationRequest';
import { createUserZodSchema } from './user.validation';
const router = express.Router();

router.post(
  '/create-user',
  validationRequest(createUserZodSchema),
  createUserController
);

export default router;
