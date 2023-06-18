import { RequestHandler } from 'express'
import { AcademicDepartmentService } from './academicDepartment.service'
import sendResponse from '../../../shared/sendResponse'
import { IAcademicDepartment } from './academicDepartment.interface'
import httpStatus from 'http-status'
import { academicDepartmentFilterFields } from './academicDepartment.constant'
import { paginationFields } from '../../../constant/pagination'
import pick from '../../../shared/pick'
import ApiError from '../../../errors/ApiError'

//create academic department
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

//get all academic departments

const getAllAcademicDepartment: RequestHandler = async (req, res, next) => {
  const filters = pick(req.query, academicDepartmentFilterFields)
  const paginationOption = pick(req.query, paginationFields)
  try {
    const result =
      await AcademicDepartmentService.getAllAcademicDepartmentFromDB(
        filters,
        paginationOption
      )
    sendResponse<IAcademicDepartment[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Get all academic departments successfully!',
      meta: result.meta,
      data: result.data,
    })
  } catch (error) {
    next(error)
  }
}

//get academic department by id

const getAcademicDepartmentById: RequestHandler = async (req, res) => {
  const { id } = req.params
  try {
    const result =
      await AcademicDepartmentService.getAcademicDepartmentByIdFromDB(id)
    sendResponse<IAcademicDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Get academic department by id successfully!',
      data: result,
    })
  } catch (error) {
    throw new ApiError(httpStatus.NOT_FOUND, `${error}`)
  }
}

//update academic department by id

const updateAcademicDepartmentById: RequestHandler = async (req, res) => {
  const { id } = req.params
  const { ...updateData } = req.body
  try {
    const result =
      await AcademicDepartmentService.updateAcademicDepartmentFromDB(
        id,
        updateData
      )
    sendResponse<IAcademicDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Update academic department  successfully!',
      data: result,
    })
  } catch (error) {
    throw new ApiError(httpStatus.NOT_FOUND, `${error}`)
  }
}

//delete academic department by id

const deleteAcademicDepartmentById: RequestHandler = async (req, res) => {
  const { id } = req.params
  try {
    const result =
      await AcademicDepartmentService.deleteAcademicDepartmentFromDB(id)
    sendResponse<IAcademicDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Delete academic department  successfully!',
      data: result,
    })
  } catch (error) {
    throw new ApiError(httpStatus.NOT_FOUND, `${error}`)
  }
}

export const AcademicDepartmentController = {
  createAcademicDepartment,
  getAllAcademicDepartment,
  getAcademicDepartmentById,
  updateAcademicDepartmentById,
  deleteAcademicDepartmentById,
}
