import { Router } from 'express'
import { AcademicDepartmentController } from './academicDepartment.controller'

const route = Router()
route.post(
  '/create-academic-department',
  AcademicDepartmentController.createAcademicDepartment
)

export const academicDepartmentRoutes = route
