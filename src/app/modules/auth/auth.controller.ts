import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import {
  loginUserService,
  refreshTokenService,
  changePasswordService,
} from './auth.service';
import { sendResponse } from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import config from '../../../config';
import { ILoginUserResponse, IRefreshTokenResponse } from './auth.interface';
import { JwtPayload } from 'jsonwebtoken';

export const loginController = catchAsync(
  async (req: Request, res: Response) => {
    const { ...loginData } = req.body;
    const result = await loginUserService(loginData);
    const { refreshToken, ...otherData } = result;

    const cookieOption = {
      secure: config.env === 'production',
      httpOnly: true,
    };

    res.cookie('refreshToken', refreshToken, cookieOption);

    sendResponse<ILoginUserResponse>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'user loggedin successful',
      data: otherData,
    });
  }
);

export const refreshTokenController = catchAsync(
  async (req: Request, res: Response) => {
    const { refreshToken } = req.cookies;
    const result = await refreshTokenService(refreshToken);

    const cookieOption = {
      secure: config.env === 'production',
      httpOnly: true,
    };

    res.cookie('refreshToken', refreshToken, cookieOption);

    sendResponse<IRefreshTokenResponse>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'access token create successful by refresh token',
      data: result,
    });
  }
);

export const changePasswordController = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.user;
    const { ...passwordData } = req.body;
    await changePasswordService(user as JwtPayload, passwordData);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'password change successful',
    });
  }
);
