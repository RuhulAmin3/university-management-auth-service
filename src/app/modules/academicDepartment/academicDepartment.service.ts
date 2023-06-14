import { SortOrder } from 'mongoose';
import { calculatePagination } from '../../../helper/paginationHelper';
import { IpaginationOptions } from '../../../interfaces/pagination';
import { academicDepartmentSearchAbleFields } from './academicDepartment.constant';
import {
  IAcademicDepartment,
  IAcademicDepartmentFilters,
} from './academicDepartment.interface';
import { academicDepartmentModel } from './academicDepartment.model';

export const createDepartmentService = async (
  data: IAcademicDepartment
): Promise<IAcademicDepartment | null> => {
  const result = (await academicDepartmentModel.create(data)).populate(
    'academicFaculty'
  );
  return result;
};

type IGenericResponse<T> = {
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: T;
};

export const getAllDepartmentService = async (
  filters: IAcademicDepartmentFilters,
  paginationOptions: IpaginationOptions
): Promise<IGenericResponse<IAcademicDepartment[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(paginationOptions);
  const andConditions = [];
  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  if (searchTerm) {
    andConditions.push({
      $or: academicDepartmentSearchAbleFields.map(field => ({
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
  const total = await academicDepartmentModel.countDocuments();
  const result = await academicDepartmentModel
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

export const getSingleDepartmentService = async (
  id: string
): Promise<IAcademicDepartment | null> => {
  const result = await academicDepartmentModel
    .findById(id)
    .populate('academicFaculty');

  return result;
};

export const updateDepartmentService = async (
  id: string,
  payload: IAcademicDepartment
): Promise<IAcademicDepartment | null> => {
  const result = await academicDepartmentModel
    .findOneAndUpdate({ _id: id }, payload, { new: true })
    .populate('academicFaculty');
  return result;
};

export const deleteDepartmentService = async (
  id: string
): Promise<IAcademicDepartment | null> => {
  const result = await academicDepartmentModel
    .findByIdAndDelete(id)
    .populate('academicFaculty');
  return result;
};
