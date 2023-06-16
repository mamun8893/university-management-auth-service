import { RequestHandler } from 'express'
import httpStatus from 'http-status'
import { IAcademicFaculty } from './academicFaculty.interface'
import sendResponse from '../../../shared/sendResponse'
import { academicFacultyService } from './academicFaculty.service'
import { paginationFields } from '../../../constant/pagination'
import { academicFacultyFilterFields } from './academicfaculty.constant'
import pick from '../../../shared/pick'

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

export const academicFacultyController = {
  academicFacultyCreate,
  getAllFaculty,
}
