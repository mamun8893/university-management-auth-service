import { Router } from 'express'
import { userRoutes } from '../app/modules/user/user.route'
import { academicSemesterRoutes } from '../app/modules/academicSemester/academicSemester.route'

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
]

moduleRoutes.forEach(route => {
  router.use(route.path, route.route)
})

export default router
