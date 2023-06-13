import { IGenericErrResponse } from '../interfaces/common';
import { IGenericErrMessage } from './../interfaces/error';
import mongoose from 'mongoose';

export const handleValidationError = (
  err: mongoose.Error.ValidationError
): IGenericErrResponse => {
  const errors: IGenericErrMessage[] = Object.values(err.errors).map(
    (el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: el?.path,
        message: el?.message,
      };
    }
  );
  return {
    statusCode: 400,
    message: 'Validation Error',
    errorMessages: errors,
  };
};
