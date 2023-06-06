import { ZodError } from 'zod';
import { IGenericErrMessage } from '../interfaces/error';
// import { IGenericErrResponse } from '../interfaces/common';

export const handleZodError = (err: ZodError) => {
  const errors: IGenericErrMessage[] = err.issues.map(issue => ({
    path: issue.path[issue.path.length - 1],
    message: issue.message,
  }));
  const statusCode = 400;
  return {
    statusCode,
    message: 'Zod validation Error',
    errorMessages: errors,
  };
};
