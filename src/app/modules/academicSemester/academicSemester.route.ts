import { Router } from 'express'
import { academicSemesterValidation } from './academicSemester.validation'
import validateRequest from '../../middlewares/validateRequest'
import { academicSemesterController } from './academicSemester.controller'

const router = Router()

router.post(
  '/create-academic-semester',
  validateRequest(academicSemesterValidation.createAcademicSemesterZodSchema),
  academicSemesterController.academicSemesterCreate
)
router.get('/', academicSemesterController.getAllSemester)
router.get('/:id', academicSemesterController.getAcademicSemesterById)

export const academicSemesterRoutes = router
