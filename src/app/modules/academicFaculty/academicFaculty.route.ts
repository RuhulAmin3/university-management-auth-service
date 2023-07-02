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
import { ENUM_USER_ROLE } from '../../../enums/user';
import { auth } from '../../middlewares/auth';
const router = express.Router();

router.post(
  '/create-faculty',
  validationRequest(academicFacultyZodSchema),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  createAcademicFacultyController
);
router.get(
  '/:id',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.STUDENT
  ),
  getSingleAcademicFacultyController
);
router.patch(
  '/:id',
  validationRequest(updateAcademicFacultyZodSchema),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  updateFacultyFacultyController
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  deleteAcademicFacultyController
);
router.get('/', getAllAcademicFacultiesController);

export default router;
