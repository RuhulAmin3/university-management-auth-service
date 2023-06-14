import { Request, Response } from 'express';
import {
  createAcademicSemester,
  getAllSemestersService,
  getSingleSemesterService,
  updateSemesterService,
  deleteSemesterService,
} from './academicSemester.service';
import catchAsync from '../../../shared/catchAsync';
import httpStatus from 'http-status';
import { sendResponse } from '../../../shared/sendResponse';
import { pick } from '../../../shared/pick';
import { paginationFields } from '../../../constant/paginationOptions';
import { academicSemesterFilterableFields } from './academicSemester.constant';
import { IAcademicSemester } from './academicSemester.interface';

export const createAcademicSemesterController = catchAsync(
  async (req: Request, res: Response) => {
    const { ...academicSemesterData } = req.body;
    const createdSemester = await createAcademicSemester(academicSemesterData);

    sendResponse<IAcademicSemester>(res, {
      success: true,
      message: 'academic semester created successfully',
      data: createdSemester,
      statusCode: httpStatus.OK,
    });
  }
);

export const getAllSemestersController = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, academicSemesterFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await getAllSemestersService(filters, paginationOptions);
    sendResponse<IAcademicSemester[]>(res, {
      success: true,
      message: 'academic semesters retrieved successfully',
      meta: result.meta,
      data: result.data,
      statusCode: httpStatus.OK,
    });
  }
);

export const getSingleSemesterController = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await getSingleSemesterService(id);

    sendResponse<IAcademicSemester>(res, {
      success: true,
      message: 'academic semester retrieved successfully',
      data: result,
      statusCode: httpStatus.OK,
    });
  }
);

export const updateSemesterController = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const updateData = req.body;
    const result = await updateSemesterService(id, updateData);
    sendResponse<IAcademicSemester>(res, {
      success: true,
      message: 'academic semester update successful',
      data: result,
      statusCode: httpStatus.OK,
    });
  }
);

export const deleteSemesterController = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await deleteSemesterService(id);
    sendResponse<IAcademicSemester>(res, {
      success: true,
      message: 'academic semester delete successful',
      data: result,
      statusCode: httpStatus.OK,
    });
  }
);
