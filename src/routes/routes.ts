import { Router } from 'express'
import { userRoutes } from '../app/modules/user/user.route'
import { academicSemesterRoutes } from '../app/modules/academicSemester/academicSemester.route'
import { academicFacultyRoutes } from '../app/modules/academicFaculty/academicFaculty.route'

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
]

moduleRoutes.forEach(route => {
  router.use(route.path, route.route)
})

export default router
