import { Model } from 'mongoose';

export type IAcademicFaculty = {
  title: string;
};

export const IAcademicFacultyModel = Model<IAcademicFaculty>;
