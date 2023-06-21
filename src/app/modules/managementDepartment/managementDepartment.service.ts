import { paginationHelper } from '../../../helper/paginationHelper'
import { IPaginationOption } from '../../../interfaces/pagination'
import { IManagementDepartment } from './managementDepartment.interface'
import { managementDepartment } from './managementDepartment.model'
import { IManagementDepartmentFilter } from './managementDepartment.interface'
import { SortOrder } from 'mongoose'
import { IGenericResponse } from '../../../interfaces/common'
import { managementDepartmentSearchableFields } from './managementDepartment.constant'

const createManagementDepartmentToDB = async (
  payload: IManagementDepartment
): Promise<IManagementDepartment> => {
  const result = await managementDepartment.create(payload)
  return result
}

const getAllManagementDepartmentFromDB = async (
  filters: IManagementDepartmentFilter,
  paginationOption: IPaginationOption
): Promise<IGenericResponse<IManagementDepartment[]>> => {
  const { searchTerm, ...filtersData } = filters

  //calculate pagination

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOption)

  //sorting

  const sortConditions: { [key: string]: SortOrder } = {}
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder
  }

  //search filter

  const andConditions = []

  if (searchTerm) {
    const orConditions: { [key: string]: { $regex: RegExp } }[] = []
    managementDepartmentSearchableFields.forEach(field => {
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
  //check if there is any condition
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {}
  //database query
  const result = await managementDepartment
    .find(whereConditions)
    .sort(sortConditions)
    .limit(limit)
    .skip(skip)

  const total = await managementDepartment.countDocuments()
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

//get management department by id

const getManagementDepartmentByIdFromDB = async (id: string) => {
  const result = await managementDepartment.findById(id)
  return result
}

//update management department

const updateManagementDepartmentToDB = async (
  id: string,
  payload: Partial<IManagementDepartment>
) => {
  const result = await managementDepartment.findByIdAndUpdate(
    { _id: id },
    payload,
    { new: true }
  )
  return result
}

//delete management department

const deleteManagementDepartmentFromDB = async (id: string) => {
  const result = await managementDepartment.findByIdAndDelete(id)
  return result
}

export const managementDepartmentService = {
  createManagementDepartmentToDB,
  getAllManagementDepartmentFromDB,
  getManagementDepartmentByIdFromDB,
  updateManagementDepartmentToDB,
  deleteManagementDepartmentFromDB,
}
