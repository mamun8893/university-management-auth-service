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

export const academicSemesterController = {
  academicSemesterCreate,
  getAllSemester,
}
