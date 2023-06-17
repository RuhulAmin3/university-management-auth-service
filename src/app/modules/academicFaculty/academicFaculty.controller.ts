import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { sendResponse } from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import {
  createAcademicFacultyService,
  getAllAcademicFacultiesService,
  getSingleAcademicFacultyService,
  updateAcademicFacultyService,
  deleteAcademicFacultyService,
} from './academicFaculty.service';
import { pick } from '../../../shared/pick';
import {
  academicFacultyFilterAbleFields,
  paginationFields,
} from './academicFaculty.constant';
import { IAcademicFaculty } from './academicFaculty.interface';

export const createAcademicFacultyController = catchAsync(
  async (req: Request, res: Response) => {
    const createData = req.body;
    const result = await createAcademicFacultyService(createData);

    sendResponse<IAcademicFaculty>(res, {
      success: true,
      message: 'academic faculty created successfully',
      data: result,
      statusCode: httpStatus.OK,
    });
  }
);

export const getAllAcademicFacultiesController = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, academicFacultyFilterAbleFields);
    const paginationOptions = pick(req.query, paginationFields);
    const result = await getAllAcademicFacultiesService(
      filters,
      paginationOptions
    );
    sendResponse<IAcademicFaculty[]>(res, {
      success: true,
      message: 'academic facultices retrieved successfully',
      data: result.data,
      meta: result.meta,
      statusCode: httpStatus.OK,
    });
  }
);

export const getSingleAcademicFacultyController = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await getSingleAcademicFacultyService(id);
    sendResponse<IAcademicFaculty>(res, {
      success: true,
      message: 'academic faculty retrieved successfully',
      data: result,
      statusCode: httpStatus.OK,
    });
  }
);

export const updateFacultyFacultyController = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = req.body;
    const result = await updateAcademicFacultyService(id, data);
    sendResponse<IAcademicFaculty>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'faculty updated successfully',
      data: result,
    });
  }
);

export const deleteAcademicFacultyController = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await deleteAcademicFacultyService(id);
    sendResponse<IAcademicFaculty>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'faculty deleted successfully',
      data: result,
    });
  }
);
