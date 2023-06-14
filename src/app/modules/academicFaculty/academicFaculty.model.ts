import { Schema, model } from 'mongoose';
import {
  IAcademicFaculty,
  AcademicFacultyModel,
} from './academicFaculty.interface';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const academicFacultySchema = new Schema<IAcademicFaculty>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

academicFacultySchema.pre('save', async function (next) {
  const isExit = await academicFacultyModal.findOne({ title: this.title });
  if (isExit) {
    throw new ApiError(
      httpStatus.CONFLICT,
      'same academic faculty already exist'
    );
  }
  next();
});

export const academicFacultyModal = model<
  IAcademicFaculty,
  AcademicFacultyModel
>('academicFaculty', academicFacultySchema);
