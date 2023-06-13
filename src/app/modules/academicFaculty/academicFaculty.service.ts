import { academicFacultyModal } from './academicFaculty.model';

type IAcademicFacultyData = {
  title: string;
};

export const createFacultyService = async (data: IAcademicFacultyData) => {
  const result = await academicFacultyModal.create(data);

  return {
    data: result,
  };
};
