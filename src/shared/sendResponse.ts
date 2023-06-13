import { Response } from 'express';

type IApiResponse<T> = {
  statusCode: number;
  message?: string | null;
  success: boolean;
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
  data?: T | null;
};

export const sendResponse = <T>(res: Response, data: IApiResponse<T>) => {
  const responseData: IApiResponse<T> = {
    success: data.success,
    statusCode: data.statusCode,
    message: data.message || null,
    meta: data.meta,
    data: data.data || null,
  };
  res.status(data.statusCode).json(responseData);
};
