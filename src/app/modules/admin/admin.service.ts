/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose, { SortOrder } from 'mongoose';
import { calculatePagination } from '../../../helper/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IpaginationOptions } from '../../../interfaces/pagination';
import { IAdmin, IAdminFilters } from './admin.interface';
import { adminSearchableFields } from './admin.constant';
import { Admin } from './admin.model';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { User } from '../user/user.model';

export const getAllAdminService = async (
  filters: IAdminFilters,
  paginationOptions: IpaginationOptions
): Promise<IGenericResponse<IAdmin[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(paginationOptions);
  const { searchTerm, ...filtersData } = filters;
  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const andCondition = [];
  if (searchTerm) {
    andCondition.push({
      $or: adminSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i', // i means case insensitive
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andCondition.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};

  const result = await Admin.find(whereCondition)
    .sort(sortConditions)
    .populate('department')
    .skip(skip)
    .limit(limit);

  const total = await Admin.countDocuments(whereCondition);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const getSingleAdminService = async (
  id: string
): Promise<IAdmin | null> => {
  const admin = await Admin.findById(id).populate('department');

  return admin;
};

export const updateAdminService = async (
  id: string,
  payload: Partial<IAdmin>
): Promise<IAdmin | null> => {
  const isExist = await Admin.findOne({ id });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'admin not found');
  }

  const { name, ...adminData } = payload;

  const updatedAdminData: Partial<IAdmin> = { ...adminData };
  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}` as keyof Partial<IAdmin>;
      (updatedAdminData as any)[nameKey] = name[key as keyof typeof name];
    });
  }
  const result = await Admin.findOneAndUpdate({ id }, updatedAdminData, {
    new: true,
  });
  return result;
};

export const deleteAdminService = async (
  id: string
): Promise<IAdmin | null> => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const isExist = await Admin.findOne({ id });
    if (!isExist) {
      throw new ApiError(httpStatus.NOT_FOUND, 'admin not found');
    }
    const result = await Admin.findOneAndDelete({ id }, { session }).populate({
      path: 'department',
      populate: [
        {
          path: 'academicFaculty',
        },
      ],
    });
    await User.findOneAndDelete({ id }, { session });
    session.commitTransaction();
    session.endSession();
    return result;
  } catch (err) {
    session.abortTransaction();
    session.endSession();
    throw err;
  }
};
