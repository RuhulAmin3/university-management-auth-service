import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import httpStatus from 'http-status';
import { sendResponse } from '../../../shared/sendResponse';
import { pick } from '../../../shared/pick';
import { paginationFields } from '../../../constant/paginationOptions';
import { IStudent } from './student.interface';
import {
  deleteStudentService,
  getAllStudentsService,
  getSingleStudentService,
  updateStudentService,
} from './student.service';
import { studentFilterableFields } from './student.constant';

export const getAllStudentsController = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, studentFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await getAllStudentsService(filters, paginationOptions);
    sendResponse<IStudent[]>(res, {
      success: true,
      message: 'students retrieved successful',
      meta: result.meta,
      data: result.data,
      statusCode: httpStatus.OK,
    });
  }
);

export const getSingleStudentController = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await getSingleStudentService(id);

    sendResponse<IStudent>(res, {
      success: true,
      message: 'student retrieved successful',
      data: result,
      statusCode: httpStatus.OK,
    });
  }
);

export const updateStudentController = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const updateData = req.body;
    const result = await updateStudentService(id, updateData);
    sendResponse<IStudent>(res, {
      success: true,
      message: 'student  update successful',
      data: result,
      statusCode: httpStatus.OK,
    });
  }
);

export const deleteStudentController = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await deleteStudentService(id);
    sendResponse<IStudent>(res, {
      success: true,
      message: 'student delete successful',
      data: result,
      statusCode: httpStatus.OK,
    });
  }
);
