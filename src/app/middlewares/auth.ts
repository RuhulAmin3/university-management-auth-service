/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import ApiError from '../../errors/ApiError';
import httpStatus from 'http-status';
import { verifyToken } from '../../helper/jwtHelpers';
import config from '../../config';

export const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        throw new ApiError(
          httpStatus.UNAUTHORIZED,
          'you are unauthorized user'
        );
      }
      let verifiedUser = null;
      verifiedUser = verifyToken(token, config.jwt.secret as string);
      req.user = verifiedUser;
      if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, 'you are forbidden user');
      }
      next();
    } catch (err) {
      next(err);
    }
  };
