import express from 'express';
import { validationRequest } from '../../middlewares/validationRequest';
import {
  loginZodSchema,
  refreshTokenZodSchema,
  changePasswordZodSchema,
} from './auth.validation';
import {
  loginController,
  refreshTokenController,
  changePasswordController,
} from './auth.controller';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { auth } from '../../middlewares/auth';

const router = express.Router();

router.post('/login', validationRequest(loginZodSchema), loginController);

router.post(
  '/refresh-token',
  validationRequest(refreshTokenZodSchema),
  refreshTokenController
);
router.post(
  '/change-password',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.STUDENT
  ),
  validationRequest(changePasswordZodSchema),
  changePasswordController
);

export default router;
