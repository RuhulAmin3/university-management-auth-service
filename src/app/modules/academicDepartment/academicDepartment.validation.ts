import { z } from 'zod';

export const academicDepartmentZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'title is required',
    }),
    academicFaculty: z.string({
      required_error: 'academic faculty is required',
    }),
  }),
});

export const updateAcademicDepartmentZodScheme = z.object({
  body: z.object({
    title: z.string().optional(),
    academicFaculty: z.string().optional(),
  }),
});
