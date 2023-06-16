import { RequestHandler } from 'express'
import httpStatus from 'http-status'
import { IAcademicFaculty } from './academicFaculty.interface'
import sendResponse from '../../../shared/sendResponse'
import { academicFacultyService } from './academicFaculty.service'
import { paginationFields } from '../../../constant/pagination'
import { academicFacultyFilterFields } from './academicfaculty.constant'
import pick from '../../../shared/pick'
import ApiError from '../../../errors/ApiError'

//Create academic faculty

const academicFacultyCreate: RequestHandler = async (req, res, next) => {
  const { ...academicFacultyData } = req.body
  try {
    const result = await academicFacultyService.createAcademicFacultyFromDB(
      academicFacultyData
    )
    sendResponse<IAcademicFaculty>(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Create academic faculty successfully!',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

//Get all academic faculty

const getAllFaculty: RequestHandler = async (req, res, next) => {
  const filters = pick(req.query, academicFacultyFilterFields)
  const paginationOption = pick(req.query, paginationFields)

  try {
    const result = await academicFacultyService.getAllAcademicFacultyFromDB(
      filters,
      paginationOption
    )
    sendResponse<IAcademicFaculty[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Get all academic semester successfully!',
      meta: result.meta,
      data: result.data,
    })
  } catch (error) {
    next(error)
  }
}

//get academic faculty by id

const getAcademicFacultyById: RequestHandler = async (req, res) => {
  const { id } = req.params
  try {
    const result = await academicFacultyService.getAcademicFacultyByIdFromDB(id)
    sendResponse<IAcademicFaculty>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Get academic faculty  successfully!',
      data: result,
    })
  } catch (error) {
    throw new ApiError(httpStatus.NOT_FOUND, `${error}`)
  }
}

//update academic faculty by id

const updateAcademicFacultyById: RequestHandler = async (req, res) => {
  const { id } = req.params
  const { ...updateData } = req.body
  try {
    const result = await academicFacultyService.updateAcademicFacultyByIdFromDB(
      id,
      updateData
    )
    sendResponse<IAcademicFaculty>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Update academic faculty  successfully!',
      data: result,
    })
  } catch (error) {
    throw new ApiError(httpStatus.NOT_FOUND, `${error}`)
  }
}

//delete academic faculty by id

const deleteAcademicFacultyById: RequestHandler = async (req, res) => {
  const { id } = req.params
  try {
    const result = await academicFacultyService.deleteAcademicFacultyByIdFromDB(
      id
    )
    sendResponse<IAcademicFaculty>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Delete academic faculty  successfully!',
      data: result,
    })
  } catch (error) {
    throw new ApiError(httpStatus.NOT_FOUND, `${error}`)
  }
}

export const academicFacultyController = {
  academicFacultyCreate,
  getAllFaculty,
  getAcademicFacultyById,
  updateAcademicFacultyById,
  deleteAcademicFacultyById,
}
