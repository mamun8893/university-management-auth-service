import { NextFunction, Request, Response } from 'express'
import { academicSemesterService } from './academicSemester.service'
import sendResponse from '../../../shared/sendResponse'
import { IAcademicSemester } from './academicSemester.interface'
import httpStatus from 'http-status'

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

export const academicSemesterController = {
  academicSemesterCreate,
}
