import { SortOrder } from 'mongoose';
import { calculatePagination } from '../../../helper/paginationHelper';
import { IpaginationOptions } from '../../../interfaces/pagination';
import {
  IAcademicFaculty,
  IAcademicFacultyFilters,
} from './academicFaculty.interface';
import { academicFacultyModal } from './academicFaculty.model';
import { academicFacultySearchAbleFields } from './academicFaculty.constant';

type IGenericResponse<T> = {
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
  data: T;
};

export const createFacultyService = async (
  data: IAcademicFaculty
): Promise<IAcademicFaculty> => {
  const result = await academicFacultyModal.create(data);
  return result;
};

export const getAllFacultiesService = async (
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
  const total = await academicFacultyModal.countDocuments();
  const result = await academicFacultyModal
    .find(whereCondition)
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

export const getSingleFacultyService = async (
  id: string
): Promise<IAcademicFaculty | null> => {
  const result = await academicFacultyModal.findById(id);
  return result;
};

export const updateFacultyService = async (
  id: string,
  data: Partial<IAcademicFaculty>
) => {
  const result = await academicFacultyModal.findOneAndUpdate(
    { _id: id },
    data,
    {
      new: true,
    }
  );
  return result;
};

export const deleteFacultyService = async (
  id: string
): Promise<IAcademicFaculty | null> => {
  const result = await academicFacultyModal.findByIdAndDelete(id);
  return result;
};
