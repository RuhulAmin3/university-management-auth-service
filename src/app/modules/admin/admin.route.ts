import express from 'express';
import {
  getSingleAdminController,
  updateAdminController,
  deleteAdminController,
  getAllAdminController,
} from './admin.controller';
import { validationRequest } from '../../middlewares/validationRequest';
import { updateAdminZodSchma } from './admin.validation';
const router = express.Router();

router.get('/:id', getSingleAdminController);
router.patch(
  '/:id',
  validationRequest(updateAdminZodSchma),
  updateAdminController
);
router.delete('/:id', deleteAdminController);
router.get('/', getAllAdminController);

export default router;
