import { Router } from 'express'
import { adminController } from './admin.controller'

const router = Router()

router.get('/', adminController.getAllAdmin)
// router.patch(
//   '/:id',
//   validateRequest(adminController.updateAdminZodSchema),
//   adminController.updateAdminById
// )
// router.get('/:id', adminController.getAdminById)
// router.delete('/:id', adminController.deleteAdminById)

export const adminRoutes = router
