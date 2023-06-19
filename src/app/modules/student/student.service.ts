import { SortOrder } from 'mongoose'
import { paginationHelper } from '../../../helper/paginationHelper'
import { IPaginationOption } from '../../../interfaces/pagination'
import { IStudent, IStudentFilters } from './student.interface'
import { studentSearchableFields } from './student.constant'
import { Student } from './student.model'
import ApiError from '../../../errors/ApiError'
import httpStatus from 'http-status'

const getAllStudentsFromDB = async (
  filters: IStudentFilters,
  paginationOption: IPaginationOption
) => {
  //search filter

  const { searchTerm, ...filtersData } = filters

  const andConditions = []

  if (searchTerm) {
    const orConditions: { [key: string]: { $regex: RegExp } }[] = []
    studentSearchableFields.forEach(field => {
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

  const result = await Student.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)

  const total = await Student.countDocuments()
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

//get student by id

const getStudentByIdFromDB = async (id: string) => {
  const result = await Student.findOne({ id })
  return result
}

//update student by id

const updateStudentByIdFromDB = async (
  id: string,
  payload: Partial<IStudent>
): Promise<IStudent | null> => {
  const isExist = await Student.findOne({ id })
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Student not found')
  }
  const { name, guardian, localGuardian, ...studentData } = payload
  const updatedStudentData: Partial<IStudent> = { ...studentData }

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      ;(updatedStudentData as any)[`name.${key}`] =
        name[key as keyof typeof name]
    })
  }
  if (guardian && Object.keys(guardian).length > 0) {
    Object.keys(guardian).forEach(key => {
      ;(updatedStudentData as any)[`guardian.${key}`] =
        guardian[key as keyof typeof guardian]
    })
  }
  if (localGuardian && Object.keys(localGuardian).length > 0) {
    Object.keys(localGuardian).forEach(key => {
      ;(updatedStudentData as any)[`localGuardian.${key}`] =
        localGuardian[key as keyof typeof localGuardian]
    })
  }

  const result = await Student.findOneAndUpdate(
    { id: id },
    updatedStudentData,
    { new: true }
  )
  return result
}

//delete student by id

const deleteStudentByIdFromDB = async (id: string) => {
  const result = await Student.findByIdAndDelete(id)
  return result
}

export const studentService = {
  getAllStudentsFromDB,
  getStudentByIdFromDB,
  deleteStudentByIdFromDB,
  updateStudentByIdFromDB,
}
