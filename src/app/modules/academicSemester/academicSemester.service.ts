import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { academicSemesterTitleCodeMapper } from './academicSemester.constant'
import { IAcademicSemester } from './academicSemester.interface'
import { AcademicSemester } from './academicSemester.model'
import { IPaginationOption } from '../../../interfaces/pagination'
import { IGenericResponse } from '../../../interfaces/common'

//Create academic semester

const createAcademicSemesterToDB = async (
  payload: IAcademicSemester
): Promise<IAcademicSemester> => {
  if (academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid academic semester code')
  }
  const result = await AcademicSemester.create(payload)
  return result
}

//get all academic semester

const getAllAcademicSemesterFromDB = async (
  paginationOption: IPaginationOption
): Promise<IGenericResponse<IAcademicSemester[]>> => {
  const { page = 1, limit = 10 } = paginationOption
  const skip = (page - 1) * limit
  const result = await AcademicSemester.find().sort().skip(skip).limit(limit)

  const total = await AcademicSemester.countDocuments()
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

export const academicSemesterService = {
  createAcademicSemesterToDB,
  getAllAcademicSemesterFromDB,
}
