import { SortOrder } from 'mongoose';
import { calculatePagination } from '../../../helper/paginationHelper';
import { IpaginationOptions } from '../../../interfaces/pagination';
import {
  IAcademicFaculty,
  IAcademicFacultyFilters,
} from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.model';
import { academicFacultySearchAbleFields } from './academicFaculty.constant';
import { IGenericResponse } from '../../../interfaces/common';

export const createAcademicFacultyService = async (
  data: IAcademicFaculty
): Promise<IAcademicFaculty> => {
  const result = await AcademicFaculty.create(data);
  return result;
};

export const getAllAcademicFacultiesService = async (
  filters: IAcademicFacultyFilters,
  paginationOptions: IpaginationOptions
): Promise<IGenericResponse<IAcademicFaculty[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(paginationOptions);
  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: academicFacultySearchAbleFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const whereCondition =
    andConditions.length > 0 ? { $and: andConditions } : {};
  const total = await AcademicFaculty.countDocuments(whereCondition);
  const result = await AcademicFaculty.find(whereCondition)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const getSingleAcademicFacultyService = async (
  id: string
): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findById(id);
  return result;
};

export const updateAcademicFacultyService = async (
  id: string,
  data: Partial<IAcademicFaculty>
) => {
  const result = await AcademicFaculty.findOneAndUpdate({ _id: id }, data, {
    new: true,
  });
  return result;
};

export const deleteAcademicFacultyService = async (
  id: string
): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findByIdAndDelete(id);
  return result;
};
