import { IUser } from './user.interface';
import { User } from './user.model';
import config from '../../../config/index';
import { generateStudentId } from './user.utils';
import { IStudent } from '../student/student.interface';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import { Student } from '../student/student.model';

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
