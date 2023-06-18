import { Router } from 'express'
import { AcademicDepartmentController } from './academicDepartment.controller'
import validateRequest from '../../middlewares/validateRequest'
import { academicDepartmentValidation } from './academicdepartment.validation'

const router = Router()
router.post(
  '/create-academic-department',
  validateRequest(
    academicDepartmentValidation.createAcademicDepartmentZodSchema
  ),
  AcademicDepartmentController.createAcademicDepartment
)

router.get('/', AcademicDepartmentController.getAllAcademicDepartment)
router.get('/:id', AcademicDepartmentController.getAcademicDepartmentById)
router.patch(
  '/:id',
  validateRequest(
    academicDepartmentValidation.updateAcademicDepartmentZodSchema
  ),
  AcademicDepartmentController.updateAcademicDepartmentById
)
router.delete('/:id', AcademicDepartmentController.deleteAcademicDepartmentById)

export const academicDepartmentRoutes = router
