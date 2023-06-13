import { NextFunction, Request, Response } from 'express';
import catchAsnyc from '../../../shared/catchAsync';
import { createUserToDb } from './user.service';
import { sendResponse } from '../../../shared/sendResponse';
import httpStatus from 'http-status';

export const createUserController = catchAsnyc(
  async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req.body;
    const createdUser = await createUserToDb(user);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'user created successfully',
      data: createdUser,
    });
    next();
  }
);
