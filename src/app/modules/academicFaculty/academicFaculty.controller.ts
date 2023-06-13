import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { sendResponse } from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import {
  createFacultyService,
  getAllFacultiesService,
  getSingleFacultyService,
  updateFacultyService,
  deleteFacultyService,
} from './academicFaculty.service';
import { pick } from '../../../shared/pick';
import {
  academicFacultyFilterAbleFields,
  paginationFields,
} from './academicFaculty.constant';

export const createFacultyController = catchAsync(
  async (req: Request, res: Response) => {
    const createData = req.body;
    const result = await createFacultyService(createData);

    sendResponse(res, {
      success: true,
      message: 'academic faculty created successfully',
      data: result,
      statusCode: httpStatus.OK,
    });
  }
);

export const getAllFacultiesController = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, academicFacultyFilterAbleFields);
    const paginationOptions = pick(req.query, paginationFields);
    const result = await getAllFacultiesService(filters, paginationOptions);
    sendResponse(res, {
      success: true,
      message: 'academic facultices retrieved successfully',
      data: result.data,
      meta: result.meta,
      statusCode: httpStatus.OK,
    });
  }
);

export const getSingleFacultyController = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await getSingleFacultyService(id);
    sendResponse(res, {
      success: true,
      message: 'academic faculty retrieved successfully',
      data: result,
      statusCode: httpStatus.OK,
    });
  }
);

export const updateFacultyController = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = req.body;
    const result = await updateFacultyService(id, data);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'faculty updated successfully',
      data: result,
    });
  }
);

export const deleteFacultyController = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await deleteFacultyService(id);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'faculty deleted successfully',
      data: result,
    });
  }
);
