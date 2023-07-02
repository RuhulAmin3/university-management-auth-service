import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { User } from '../user/user.model';
import {
  IChangePassword,
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from './auth.interface';
import { JwtPayload, Secret } from 'jsonwebtoken';
import { createToken, verifyToken } from '../../../helper/jwtHelpers';
import config from '../../../config';
import bcrypt from 'bcrypt';

export const loginUserService = async (
  payload: ILoginUser
): Promise<ILoginUserResponse> => {
  const { id, password } = payload;

  const user = new User();

  const isUserExist = await user.isUserExist(id);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'user does not exist');
  }
  if (
    isUserExist?.password &&
    !(await user.isPaswordMatched(password, isUserExist?.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'password incorrect');
  }
  const { id: userId, role, needPasswordChange } = isUserExist || {};

  const accessToken = createToken(
    { userId, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );
  const refreshToken = createToken(
    { userId, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );
  return {
    accessToken,
    refreshToken,
    needPasswordChange,
  };
};

export const refreshTokenService = async (
  token: string
): Promise<IRefreshTokenResponse> => {
  // varify token
  let verifiedToken = null;
  try {
    verifiedToken = verifyToken(token, config.jwt.refresh_secret as Secret);
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'invalid refresh token');
  }
  const { userId } = verifiedToken;
  const user = new User();
  const isUserExist = await user.isUserExist(userId);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'user does not exist');
  }

  // generate new access token

  const newAccessToken = createToken(
    {
      id: isUserExist.id,
      role: isUserExist.role,
    },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

export const changePasswordService = async (
  user: JwtPayload,
  passwordData: IChangePassword
): Promise<void> => {
  const { userId } = user;
  const { oldPassword, newPassword } = passwordData;
  // make user instance to apply user instance methods;
  const userInstance = new User();
  // check user exist or not
  const isUserExist = await userInstance.isUserExist(userId);
  if (!isUserExist) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'user dose not exist');
  }

  // check old passord match or not
  const isPasswordMatched = await userInstance.isPaswordMatched(
    oldPassword,
    isUserExist.password as string
  );

  if (!isPasswordMatched) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'old password in incorrect');
  }

  // password hashed
  const hashPassword = await bcrypt.hash(
    newPassword,
    Number(config.bcrypt_solt_round)
  );
  const updatedData = {
    password: hashPassword,
    needPasswordChange: false,
    passwordChangeAt: new Date(),
  };

  // update data
  await User.findOneAndUpdate({ id: userId }, updatedData);
};
