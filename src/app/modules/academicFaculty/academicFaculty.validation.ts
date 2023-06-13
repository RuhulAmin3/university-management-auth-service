import { z } from 'zod';

export const academicFacultyZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'title is required',
    }),
  }),
});

export const updateAcademicFacultyZodSchema = z.object({
  body: z.object({
    title: z.string().optional(),
  }),
});
