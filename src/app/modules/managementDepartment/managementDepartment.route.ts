import { Router } from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { managementDepartmentValidation } from './managementDepartment.validation'
import { academicDepartmentController } from './managementDepartment.controller'

const router = Router()

router.post(
  '/create-management',
  validateRequest(
    managementDepartmentValidation.createManagementDepartmentZodSchema
  ),
  academicDepartmentController.createManagementDepartment
)

router.get('/', academicDepartmentController.getAllManagementDepartment)
router.get('/:id', academicDepartmentController.getManagementDepartmentById)
router.patch(
  '/:id',
  validateRequest(
    managementDepartmentValidation.updateManagementDepartmentZodSchema
  ),
  academicDepartmentController.updateManagementDepartmentById
)
router.delete(
  '/:id',
  academicDepartmentController.deleteManagementDepartmentById
)

export const managementDepartmentRoutes = router
