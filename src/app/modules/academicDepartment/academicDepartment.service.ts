import { SortOrder } from 'mongoose'
import { paginationHelper } from '../../../helper/paginationHelper'
import { IGenericResponse } from '../../../interfaces/common'
import { IPaginationOption } from '../../../interfaces/pagination'
import { academicDepartmentSearchableFields } from './academicDepartment.constant'
import {
  IAcademicDepartment,
  IAcademicDepartmentFilters,
} from './academicDepartment.interface'
import { AcademicDepartment } from './academicDepartment.model'

//create academic department

const createAcademicDepartmentFromDB = async (
  payload: IAcademicDepartment
): Promise<IAcademicDepartment> => {
  const result = (await AcademicDepartment.create(payload)).populate(
    'academicFaculty'
  )
  return result
}

//get all academic departments

const getAllAcademicDepartmentFromDB = async (
  filters: IAcademicDepartmentFilters,
  paginationOption: IPaginationOption
): Promise<IGenericResponse<IAcademicDepartment[]>> => {
  //search filter

  const { searchTerm, ...filtersData } = filters

  const andConditions = []

  if (searchTerm) {
    const orConditions: { [key: string]: { $regex: RegExp } }[] = []
    academicDepartmentSearchableFields.forEach(field => {
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

  const result = await AcademicDepartment.find(whereConditions)
    .populate('academicFaculty')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)

  const total = await AcademicDepartment.countDocuments()
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

//get academic department by id

const getAcademicDepartmentByIdFromDB = async (id: string) => {
  const result = await AcademicDepartment.findById(id).populate(
    'academicFaculty'
  )
  return result
}

//update academic department

const updateAcademicDepartmentFromDB = async (
  id: string,
  payload: Partial<IAcademicDepartment>
) => {
  const result = await AcademicDepartment.findByIdAndUpdate(
    { _id: id },
    payload,
    { new: true }
  ).populate('academicFaculty')
  return result
}

//delete academic department

const deleteAcademicDepartmentFromDB = async (id: string) => {
  const result = await AcademicDepartment.findByIdAndDelete(id).populate(
    'academicFaculty'
  )
  return result
}

export const AcademicDepartmentService = {
  createAcademicDepartmentFromDB,
  getAllAcademicDepartmentFromDB,
  getAcademicDepartmentByIdFromDB,
  updateAcademicDepartmentFromDB,
  deleteAcademicDepartmentFromDB,
}
