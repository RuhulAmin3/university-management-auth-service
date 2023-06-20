import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { pick } from '../../../shared/pick';
import { adminFilterableFields } from './admin.constant';
import { paginationFields } from '../academicFaculty/academicFaculty.constant';
import { IAdmin } from './admin.interface';
import httpStatus from 'http-status';
import { sendResponse } from '../../../shared/sendResponse';
import {
  deleteAdminService,
  getAllAdminService,
  getSingleAdminService,
  updateAdminService,
} from './admin.service';

export const getAllAdminController = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, adminFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await getAllAdminService(filters, paginationOptions);
    sendResponse<IAdmin[]>(res, {
      success: true,
      message: 'admin retrieved successful',
      meta: result.meta,
      data: result.data,
      statusCode: httpStatus.OK,
    });
  }
);
export const getSingleAdminController = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await getSingleAdminService(id);
    sendResponse<IAdmin>(res, {
      success: true,
      message: 'admin retrieved successful',
      data: result,
      statusCode: httpStatus.OK,
    });
  }
);
export const updateAdminController = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await updateAdminService(id, req.body);
    sendResponse<IAdmin>(res, {
      success: true,
      message: 'admin updated successful',
      data: result,
      statusCode: httpStatus.OK,
    });
  }
);
export const deleteAdminController = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await deleteAdminService(id);
    sendResponse<IAdmin>(res, {
      success: true,
      message: 'admin deleted successful',
      data: result,
      statusCode: httpStatus.OK,
    });
  }
);
