import { Request, Response } from 'express';
import catchAsnyc from '../../../shared/catchAsync';
import { sendResponse } from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { createFacultyService } from './academicFaculty.service';

export const createFacultyController = catchAsnyc(
  async (req: Request, res: Response) => {
    const createData = req.body;
    const result = await createFacultyService(createData);

    sendResponse(res, {
      success: true,
      message: 'academic faculty created successfully',
      data: result.data,
      statusCode: httpStatus.OK,
    });
  }
);
