import { RequestHandler } from 'express'
import { AcademicDepartmentService } from './academicDepartment.service'
import sendResponse from '../../../shared/sendResponse'
import { IAcademicDepartment } from './academicDepartment.interface'
import httpStatus from 'http-status'

const createAcademicDepartment: RequestHandler = async (req, res, next) => {
  const { ...departmentData } = req.body
  try {
    const result =
      await AcademicDepartmentService.createAcademicDepartmentFromDB(
        departmentData
      )
    sendResponse<IAcademicDepartment>(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Create academic department successfully!',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

export const AcademicDepartmentController = {
  createAcademicDepartment,
}
