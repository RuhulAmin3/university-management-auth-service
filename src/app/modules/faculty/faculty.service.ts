/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IFaculty } from './faculty.interface';
import { Faculty } from './faculty.model';

export const getSingleFacultyService = async (
  id: string
): Promise<IFaculty | null> => {
  const result = await Faculty.findOne({ id });
  // .populate('academicFaculty')
  // .populate('academicDepartment');
  return result;
};

export const deleteSingleFacultyService = async (
  id: string
): Promise<IFaculty | null> => {
  const result = await Faculty.findByIdAndDelete(id)
    .populate('academicFaculty')
    .populate('academicDepartment');

  return result;
};

export const updateFacultyService = async (
  id: string,
  data: IFaculty
): Promise<IFaculty | null> => {
  const isExist = await Faculty.findOne({ id });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'faculty not found');
  }

  const { name, ...facultyData } = data;

  const updatedFacultyData: Partial<IFaculty> = { ...facultyData };

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const facultyKey = `name.${key}` as keyof Partial<IFaculty>;
      (updatedFacultyData as any)[facultyKey] = name[key as keyof typeof name];
    });
  }
  const result = await Faculty.findOneAndUpdate({ id }, updatedFacultyData, {
    new: true,
  });

  return result;
};
