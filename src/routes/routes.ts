import { Router } from 'express'
import { userRoutes } from '../app/modules/user/user.route'
import { academicSemesterRoutes } from '../app/modules/academicSemester/academicSemester.route'
import { academicFacultyRoutes } from '../app/modules/academicFaculty/academicFaculty.route'
import { academicDepartmentRoutes } from '../app/modules/academicDepartment/academicDepartment.route'
import { studentRoutes } from '../app/modules/student/student.route'

const router = Router()

const moduleRoutes = [
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/academic-semester',
    route: academicSemesterRoutes,
  },
  {
    path: '/academic-faculty',
    route: academicFacultyRoutes,
  },
  {
    path: '/academic-department',
    route: academicDepartmentRoutes,
  },
  {
    path: '/students',
    route: studentRoutes,
  },
]

moduleRoutes.forEach(route => {
  router.use(route.path, route.route)
})

export default router
