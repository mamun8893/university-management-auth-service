import { SortOrder } from 'mongoose'
import { paginationHelper } from '../../../helper/paginationHelper'
import { IGenericResponse } from '../../../interfaces/common'
import { IPaginationOption } from '../../../interfaces/pagination'
import { academicSemesterSearchableFields } from '../academicSemester/academicSemester.constant'
import {
  IAcademicFaculty,
  IAcademicFacultyFilters,
} from './academicFaculty.interface'
import { AcademicFaculty } from './academicFaculty.modal'

//create academic faculty

const createAcademicFacultyFromDB = async (
  payload: IAcademicFaculty
): Promise<IAcademicFaculty> => {
  const result = await AcademicFaculty.create(payload)
  return result
}

//get all academic semester

const getAllAcademicFacultyFromDB = async (
  filters: IAcademicFacultyFilters,
  paginationOption: IPaginationOption
): Promise<IGenericResponse<IAcademicFaculty[]>> => {
  //search filter

  const { searchTerm, ...filtersData } = filters

  const andConditions = []

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
  //sortby(fields name) and sortorder(asc,desc)
  const sortConditions: { [key: string]: SortOrder } = {}
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {}

  const result = await AcademicFaculty.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)

  const total = await AcademicFaculty.countDocuments()
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

const getAcademicFacultyByIdFromDB = async (id: string) => {
  const result = await AcademicFaculty.findById(id)
  return result
}

//update academic semester

const updateAcademicFacultyByIdFromDB = async (
  id: string,
  payload: Partial<IAcademicFaculty>
) => {
  const result = await AcademicFaculty.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  })
  return result
}

//delete academic semester

const deleteAcademicFacultyByIdFromDB = async (id: string) => {
  const result = await AcademicFaculty.findByIdAndDelete(id)
  return result
}

export const academicFacultyService = {
  createAcademicFacultyFromDB,
  getAllAcademicFacultyFromDB,
  getAcademicFacultyByIdFromDB,
  updateAcademicFacultyByIdFromDB,
  deleteAcademicFacultyByIdFromDB,
}
