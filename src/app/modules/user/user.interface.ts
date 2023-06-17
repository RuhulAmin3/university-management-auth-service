import { Model, Types } from 'mongoose';
import { IStudent } from '../student/student.interface';
import { IAcademicFaculty } from '../academicFaculty/academicFaculty.interface';

export type IUser = {
  id: string;
  role: string;
  password: string;
  student?: Types.ObjectId | IStudent;
  faculty?: Types.ObjectId | IAcademicFaculty;
  // admin?: Types.ObjectId | ;
};

export type UserModel = Model<IUser, Record<string, unknown>>;
