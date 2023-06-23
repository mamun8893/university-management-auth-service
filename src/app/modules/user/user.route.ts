import { Router } from 'express'
import { userController } from './user.controller'
import validateRequest from '../../middlewares/validateRequest'
import { userValidation } from './user.validation'

const router = Router()

//Create student
router.post(
  '/create-student',
  validateRequest(userValidation.createStudentZodSchema),
  userController.createStudent
)

//create Admin

router.post(
  '/create-admin',
  validateRequest(userValidation.createAdminZodSchema),
  userController.createAdmin
)

export const userRoutes = router
