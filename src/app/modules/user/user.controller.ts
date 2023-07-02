import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import {
  createStudentService,
  createFacultyService,
  createAdminService,
} from './user.service';
import { sendResponse } from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { IUser } from './user.interface';

export const createStudentController = catchAsync(
  async (req: Request, res: Response) => {
    const { student, ...userData } = req.body;
    const createdStudent = await createStudentService(student, userData);
    sendResponse<IUser>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'student user created successfully',
      data: createdStudent,
    });
  }
);

export const createFacultyController = catchAsync(
  async (req: Request, res: Response) => {
    const { faculty, ...userData } = req.body;
    console.log("cookie:", req.cookies);
    const createdFaculty = await createFacultyService(faculty, userData);
    sendResponse<IUser>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'faculty user created successfully',
      data: createdFaculty,
    });
  }
);

export const createAdminController = catchAsync(
  async (req: Request, res: Response) => {
    const { admin, ...userData } = req.body;
    const createdAdmin = await createAdminService(admin, userData);

    sendResponse<IUser>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'admin user created successfully',
      data: createdAdmin,
    });
  }
);
