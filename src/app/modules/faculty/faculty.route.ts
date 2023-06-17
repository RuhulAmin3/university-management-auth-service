import express from 'express';
import {
  deleteSingleFacultyController,
  getSingleFacultyController,
  updateFacultyController,
} from './faculty.controller';
import { validationRequest } from '../../middlewares/validationRequest';

import { updateFacultyZodSchema } from './faculty.validation';

const router = express.Router();

router.get('/:id', getSingleFacultyController);

router.patch(
  '/:id',
  validationRequest(updateFacultyZodSchema),
  updateFacultyController
);

router.delete('/:id', deleteSingleFacultyController);

export default router;
