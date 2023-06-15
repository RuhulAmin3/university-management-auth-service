import { Request, Response } from 'express';
import catchAsnyc from '../../../shared/catchAsync';
import { createStudentService } from './user.service';
import { sendResponse } from '../../../shared/sendResponse';
import httpStatus from 'http-status';

export const createStudentController = catchAsnyc(
  async (req: Request, res: Response) => {
    const { student, ...userData } = req.body;
    const createdStudent = await createStudentService(student, userData);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'user created successfully',
      data: createdStudent,
    });
  }
);
