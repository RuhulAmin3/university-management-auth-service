import express from 'express';
import UserRoutes from '../modules/user/user.route';
import AcademicSemesterRoutes from '../modules/academicSemester/academicSemester.route';
import AcademicFacultyRoutes from '../modules/academicFaculty/academicFaculty.route';
import AcademicDepartmentRoutes from '../modules/academicDepartment/academicDepartment.route';
import studentRoutes from '../modules/student/student.route';
import facultyRoutes from '../modules/faculty/faculty.route';
import adminRoutes from '../modules/admin/admin.route';
import authRoutes from '../modules/auth/auth.route';
const router = express.Router();

const moduleRoutes = [
  { path: '/users', route: UserRoutes },
  { path: '/academic-semesters', route: AcademicSemesterRoutes },
  { path: '/academic-faculty', route: AcademicFacultyRoutes },
  { path: '/academic-department', route: AcademicDepartmentRoutes },
  { path: '/student', route: studentRoutes },
  { path: '/faculties', route: facultyRoutes },
  { path: '/admin', route: adminRoutes },
  { path: '/auth', route: authRoutes },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
