import { NextFunction, Request, RequestHandler, Response } from 'express'
import { academicSemesterService } from './academicSemester.service'
import sendResponse from '../../../shared/sendResponse'
import { IAcademicSemester } from './academicSemester.interface'
import httpStatus from 'http-status'
import pick from '../../../shared/pick'
import { paginationFields } from '../../../constant/pagination'
import { academicSemesterFilterFields } from './academicSemester.constant'

//Create academic semester

const academicSemesterCreate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { ...academicSemesterData } = req.body
  try {
    const result = await academicSemesterService.createAcademicSemesterToDB(
      academicSemesterData
    )
    sendResponse<IAcademicSemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic semester created successfully!',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

//Get all academic semester

const getAllSemester: RequestHandler = async (req, res, next) => {
  const filters = pick(req.query, academicSemesterFilterFields)
  const paginationOption = pick(req.query, paginationFields)

  try {
    const result = await academicSemesterService.getAllAcademicSemesterFromDB(
      filters,
      paginationOption
    )
    sendResponse<IAcademicSemester[]>(res, {
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

//get academic semester by id

const getAcademicSemesterById: RequestHandler = async (req, res) => {
  const { id } = req.params
  try {
    const result = await academicSemesterService.getAcademicSemesterByIdFromDB(
      id
    )
    sendResponse<IAcademicSemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Get academic semester by id successfully!',
      data: result,
    })
  } catch (error) {
    // console.log(error)
  }
}

//update academic semester by id

const updateAcademicSemester: RequestHandler = async (req, res) => {
  const { id } = req.params
  const { ...payload } = req.body
  try {
    const result =
      await academicSemesterService.updateAcademicSemesterByIdFromDB(
        id,
        payload
      )
    sendResponse<IAcademicSemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Update academic semester  successfully!',
      data: result,
    })
  } catch (error) {
    console.log(error)
  }
}

// delete academic semester by id

const deleteAcademicSemester: RequestHandler = async (req, res) => {
  const { id } = req.params
  try {
    const result =
      await academicSemesterService.deleteAcademicSemesterByIdFromDB(id)
    sendResponse<IAcademicSemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Delete academic semester  successfully!',
      data: result,
    })
  } catch (error) {
    // console.log(error)
  }
}

export const academicSemesterController = {
  academicSemesterCreate,
  getAllSemester,
  getAcademicSemesterById,
  updateAcademicSemester,
  deleteAcademicSemester,
}
