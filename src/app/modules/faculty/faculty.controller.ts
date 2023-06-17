import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { sendResponse } from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { IFaculty } from './faculty.interface';
import {
  getSingleFacultyService,
  updateFacultyService,
  deleteSingleFacultyService,
} from './faculty.service';

export const getSingleFacultyController = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await getSingleFacultyService(id);

    sendResponse<IFaculty>(res, {
      success: true,
      message: 'single faculty retrieved successfully',
      statusCode: httpStatus.OK,
      data: result,
    });
  }
);
export const updateFacultyController = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedData = req.body;
    const result = await updateFacultyService(id, updatedData);

    sendResponse<IFaculty>(res, {
      success: true,
      message: 'single faculty updated successfully',
      statusCode: httpStatus.OK,
      data: result,
    });
  }
);
export const deleteSingleFacultyController = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await deleteSingleFacultyService(id);

    sendResponse<IFaculty>(res, {
      success: true,
      message: 'single faculty deleted successfully',
      statusCode: httpStatus.OK,
      data: result,
    });
  }
);
