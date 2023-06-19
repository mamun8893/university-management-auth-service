import { Router } from 'express'
import { studentController } from './student.controller'
import validateRequest from '../../middlewares/validateRequest'
import { StudentValidation } from './student.validation'

const router = Router()

router.get('/', studentController.getAllStudents)
router.patch(
  '/:id',
  validateRequest(StudentValidation.updateStudentZodSchema),
  studentController.updateStudentById
)
router.get('/:id', studentController.getStudentById)
router.delete('/:id', studentController.deleteStudentById)

export const studentRoutes = router
