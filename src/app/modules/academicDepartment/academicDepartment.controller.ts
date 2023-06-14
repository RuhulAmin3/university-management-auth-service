import httpStatus from 'http-status';
import { sendResponse } from '../../../shared/sendResponse';
import { Request, Response } from 'express';
import { IAcademicDepartment } from './academicDepartment.interface';
import {
  createDepartmentService,
  getAllDepartmentService,
  getSingleDepartmentService,
  updateDepartmentService,
  deleteDepartmentService,
} from './academicDepartment.service';
import catchAsync from '../../../shared/catchAsync';
import { pick } from '../../../shared/pick';
import { academicDepartmentFilterAbleFields } from './academicDepartment.constant';
import { paginationFields } from '../../../constant/paginationOptions';

export const createDepartmentController = catchAsync(
  async (req: Request, res: Response) => {
    const data = req.body;
    const result = await createDepartmentService(data);

    sendResponse<IAcademicDepartment>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'academic department created successfully',
      data: result,
    });
  }
);

export const getAllDepartmentController = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, academicDepartmentFilterAbleFields);
    const paginationOptions = pick(req.query, paginationFields);
    const result = await getAllDepartmentService(filters, paginationOptions);

    sendResponse<IAcademicDepartment[]>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'academic departments retrieved successfully',
      data: result.data,
      meta: result.meta,
    });
  }
);

export const getSingleDepartmentController = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await getSingleDepartmentService(id);

    sendResponse<IAcademicDepartment>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'academic department retrieved successfully',
      data: result,
    });
  }
);

export const updateDepartmentController = catchAsync(
  async (req: Request, res: Response) => {
    const updatedData = req.body;
    const { id } = req.params;
    const result = await updateDepartmentService(id, updatedData);

    sendResponse<IAcademicDepartment>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'academic department updated successfully',
      data: result,
    });
  }
);

export const deleteDepartmentController = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await deleteDepartmentService(id);
    sendResponse<IAcademicDepartment | null>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'academic department deleted successfully',
      data: result,
    });
  }
);
