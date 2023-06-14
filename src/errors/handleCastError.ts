import mongoose from 'mongoose';
import { IGenericErrMessage } from '../interfaces/error';

export const handleCastError = (err: mongoose.Error.CastError) => {
  const errors: IGenericErrMessage[] = [
    {
      path: err.path,
      message: 'invalid id',
    },
  ];
  const message = 'Invalid Id';
  const statusCode = 400;
  return {
    statusCode,
    message,
    errorMessages: errors,
  };
};
