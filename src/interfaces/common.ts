import { IGenericErrMessage } from './error';

export type IGenericErrResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrMessage[];
};
