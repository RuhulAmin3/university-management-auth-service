import { IUser } from './user.interface';
import { User } from './user.model';
import config from '../../../config/index';
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from './user.utils';
import { IStudent } from '../student/student.interface';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import { Student } from '../student/student.model';
import { IFaculty } from '../faculty/faculty.interface';
import { Faculty } from '../faculty/faculty.model';
import { IAdmin } from '../admin/admin.interface';
import { Admin } from '../admin/admin.model';

export const createStudentService = async (
  student: IStudent,
  user: IUser
): Promise<IUser | null> => {
  // set default password
  if (!user.password) {
    user.password = config.default_student_pass as string;
  }
  // set rule
  user.role = 'student';

  // auto generated Id
  const academicSemester = await AcademicSemester.findById(
    student.academicSemester
  );

  // transction and rollback start from here
  const session = await mongoose.startSession();
  let userAllData = null;
  try {
    session.startTransaction();
    const id = await generateStudentId(academicSemester);
    user.id = id;
    student.id = id;

    // newStudent will be array
    const newStudent = await Student.create([student], { session });
    if (!newStudent.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'failed to create student');
    }

    // set new student reference into user collections
    user.student = newStudent[0]._id;
    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'failed to create user');
    }

    userAllData = newUser[0];
    await session.commitTransaction();
    await session.endSession();
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw err;
    // throw new ApiError(httpStatus.BAD_REQUEST, 'error occured');
  }

  if (userAllData) {
    userAllData = await User.findOne({ id: userAllData.id }).populate({
      path: 'student',
      populate: [
        {
          path: 'academicFaculty',
        },
        {
          path: 'academicSemester',
        },
        {
          path: 'academicDepartment',
        },
      ],
    });
  }

  return userAllData;
};

export const createFacultyService = async (
  faculty: IFaculty,
  user: IUser
): Promise<IUser | null> => {
  // set default password
  if (!user.password) {
    user.password = config.default_faculty_pass as string;
  }

  // set rule
  user.role = 'faculty';

  // transction and rollback start from here
  const session = await mongoose.startSession();
  let userAllData = null;
  try {
    session.startTransaction();
    const id = await generateFacultyId();
    user.id = id;
    faculty.id = id;

    // newFaculty will be an array
    const newFaculty = await Faculty.create([faculty], { session });
    if (!newFaculty.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'failed to create faculty');
    }

    // set new student reference into user collections
    user.faculty = newFaculty[0]._id;
    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'failed to create user');
    }

    userAllData = newUser[0];
    await session.commitTransaction();
    await session.endSession();
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw err;
    // throw new ApiError(httpStatus.BAD_REQUEST, 'error occured');
  }

  if (userAllData) {
    userAllData = await User.findOne({ id: userAllData.id }).populate({
      path: 'faculty',
      populate: [
        {
          path: 'academicFaculty',
        },
        {
          path: 'academicDepartment',
        },
      ],
    });
  }

  return userAllData;
};

export const createAdminService = async (
  admin: IAdmin,
  user: IUser
): Promise<IUser | null> => {
  // set default password
  if (!user.password) {
    user.password = config.default_admin_pass as string;
  }

  // set rule
  user.role = 'admin';

  // transction and rollback start from here
  const session = await mongoose.startSession();
  let userAllData = null;
  try {
    session.startTransaction();
    const id = await generateAdminId();
    user.id = id;
    admin.id = id;

    // newFaculty will be an array
    const newAdmin = await Admin.create([admin], { session });
    if (!newAdmin.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'failed to create faculty');
    }

    // set new student reference into user collections
    user.admin = newAdmin[0]._id;
    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'failed to create user');
    }

    userAllData = newUser[0];
    await session.commitTransaction();
    await session.endSession();
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw err;
    // throw new ApiError(httpStatus.BAD_REQUEST, 'error occured');
  }

  if (userAllData) {
    userAllData = await User.findOne({ id: userAllData.id }).populate({
      path: 'admin',
      populate: [
        {
          path: 'department',
        },
      ],
    });
  }

  return userAllData;
};
