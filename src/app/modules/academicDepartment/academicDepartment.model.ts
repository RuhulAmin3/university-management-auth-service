import { Schema, Types, model } from 'mongoose';
import {
  IAcademicDepartment,
  IAcademicDepartmentModal,
} from './academicDepartment.interface';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const academicDepartmentSchema = new Schema<
  IAcademicDepartment,
  IAcademicDepartmentModal
>(
  {
    title: {
      type: String,
      require: true,
      unique: true,
    },
    academicFaculty: {
      type: Types.ObjectId,
      ref: 'academicFaculty',
      require: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

academicDepartmentSchema.pre('save', async function (next) {
  const isExist = await AcademicDepartment.findOne({ title: this.title });
  if (isExist) {
    throw new ApiError(httpStatus.CONFLICT, 'same department already exist');
  }
  next();
});

export const AcademicDepartment = model<
  IAcademicDepartment,
  IAcademicDepartmentModal
>('academicDepartment', academicDepartmentSchema);
