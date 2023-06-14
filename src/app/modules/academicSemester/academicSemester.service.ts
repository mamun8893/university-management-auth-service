import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import {
  academicSemesterSearchableFields,
  academicSemesterTitleCodeMapper,
} from './academicSemester.constant'
import {
  IAcademicSemester,
  IAcademicSemesterFilters,
} from './academicSemester.interface'
import { AcademicSemester } from './academicSemester.model'
import { IPaginationOption } from '../../../interfaces/pagination'
import { IGenericResponse } from '../../../interfaces/common'
import { paginationHelper } from '../../../helper/paginationHelper'
import { SortOrder } from 'mongoose'

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
  filters: IAcademicSemesterFilters,
  paginationOption: IPaginationOption
): Promise<IGenericResponse<IAcademicSemester[]>> => {
  //search filter

  const { searchTerm, ...filtersData } = filters

  const andConditions = []
  console.log(Object.entries(filtersData))
  if (searchTerm) {
    const orConditions: { [key: string]: { $regex: RegExp } }[] = []
    academicSemesterSearchableFields.forEach(field => {
      orConditions.push({
        [field]: {
          $regex: new RegExp(searchTerm.toString(), 'i'),
        },
      })
    })

    andConditions.push({ $or: orConditions })
  }

  if (Object.keys(filtersData).length) {
    const filterConditions = Object.entries(filtersData).map(
      ([field, value]) => ({
        [field]: value,
      })
    )

    andConditions.push({ $and: filterConditions })
  }

  //pagination
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOption)

  const sortConditions: { [key: string]: SortOrder } = {}
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {}

  const result = await AcademicSemester.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)

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

//get academic semester by id
const getAcademicSemesterByIdFromDB = async (id: string) => {
  const result = await AcademicSemester.findById(id)
  return result
}

//update academic semester by id

const updateAcademicSemesterByIdFromDB = async (
  id: string,
  payload: Partial<IAcademicSemester>
) => {
  if (
    payload.title &&
    payload.code &&
    academicSemesterTitleCodeMapper[payload.title] !== payload.code
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid academic semester code')
  }
  const result = await AcademicSemester.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })
  return result
}

export const academicSemesterService = {
  createAcademicSemesterToDB,
  getAllAcademicSemesterFromDB,
  getAcademicSemesterByIdFromDB,
  updateAcademicSemesterByIdFromDB,
}
