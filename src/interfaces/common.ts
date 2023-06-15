import { IGenericErrMessage } from './error';

export type IGenericErrResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrMessage[];
};

export type IGenericResponse<T> = {
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
  data: T;
};
