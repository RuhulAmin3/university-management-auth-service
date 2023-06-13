import { Schema, model } from 'mongoose';
import {
  IAcademicFaculty,
  AcademicFacultyModel,
} from './academicFaculty.interface';

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
  }
);

export const academicFacultyModal = model<
  IAcademicFaculty,
  AcademicFacultyModel
>('academicFaculty', academicFacultySchema);
