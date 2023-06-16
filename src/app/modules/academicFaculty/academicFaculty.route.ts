import { Router } from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { academicFacultyValidation } from './academicFaculty.validation'
import { academicFacultyController } from './academicFaculty.controller'

const router = Router()

router.post(
  '/create-academic-faculty',
  validateRequest(academicFacultyValidation.createAcademicFacultyZodSchema),
  academicFacultyController.academicFacultyCreate
)
router.get('/', academicFacultyController.getAllFaculty)

export const academicFacultyRoutes = router
