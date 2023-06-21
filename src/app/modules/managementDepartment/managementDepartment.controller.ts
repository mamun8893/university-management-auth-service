import { RequestHandler } from 'express'
import httpStatus from 'http-status'
import sendResponse from '../../../shared/sendResponse'
import { managementDepartmentService } from './managementDepartment.service'
import { IManagementDepartment } from './managementDepartment.interface'
import pick from '../../../shared/pick'
import { paginationFields } from '../../../constant/pagination'
import { managementDepartmentFilterableFields } from './managementDepartment.constant'
import ApiError from '../../../errors/ApiError'

const createManagementDepartment: RequestHandler = async (req, res, next) => {
  const { ...departmentData } = req.body
  try {
    const result =
      await managementDepartmentService.createManagementDepartmentToDB(
        departmentData
      )
    sendResponse<IManagementDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Create management department successfully!',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

const getAllManagementDepartment: RequestHandler = async (req, res) => {
  const paginationOptions = pick(req.query, paginationFields)
  const filters = pick(req.query, managementDepartmentFilterableFields)

  try {
    const result =
      await managementDepartmentService.getAllManagementDepartmentFromDB(
        filters,
        paginationOptions
      )
    sendResponse<IManagementDepartment[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Get all management department successfully!',
      meta: result.meta,
      data: result.data,
    })
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, `${error}`)
  }
}

//get management department by id

const getManagementDepartmentById: RequestHandler = async (req, res) => {
  const { id } = req.params
  try {
    const result =
      await managementDepartmentService.getManagementDepartmentByIdFromDB(id)
    sendResponse<IManagementDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Get management department by id successfully!',
      data: result,
    })
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, `${error}`)
  }
}

//update management department by id

const updateManagementDepartmentById: RequestHandler = async (req, res) => {
  const { id } = req.params
  const { ...updateData } = req.body
  try {
    const result =
      await managementDepartmentService.updateManagementDepartmentToDB(
        id,
        updateData
      )
    sendResponse<IManagementDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Update management department by id successfully!',
      data: result,
    })
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, `${error}`)
  }
}

//delete management department by id

const deleteManagementDepartmentById: RequestHandler = async (req, res) => {
  const { id } = req.params
  try {
    const result =
      await managementDepartmentService.deleteManagementDepartmentFromDB(id)
    sendResponse<IManagementDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Delete management department by id successfully!',
      data: result,
    })
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, `${error}`)
  }
}

export const academicDepartmentController = {
  createManagementDepartment,
  getAllManagementDepartment,
  getManagementDepartmentById,
  updateManagementDepartmentById,
  deleteManagementDepartmentById,
}
