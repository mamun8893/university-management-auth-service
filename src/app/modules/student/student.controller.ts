import { RequestHandler } from 'express'
import sendResponse from '../../../shared/sendResponse'
import ApiError from '../../../errors/ApiError'
import httpStatus from 'http-status'
import { IStudent } from './student.interface'
import pick from '../../../shared/pick'
import { paginationFields } from '../../../constant/pagination'
import { studentFilterableFields } from './student.constant'
import { studentService } from './student.service'

//get all students

const getAllStudents: RequestHandler = async (req, res, next) => {
  const filters = pick(req.query, studentFilterableFields)
  const paginationOption = pick(req.query, paginationFields)

  try {
    const result = await studentService.getAllStudentsFromDB(
      filters,
      paginationOption
    )
    sendResponse<IStudent[]>(res, {
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

//get student by id

const getStudentById: RequestHandler = async (req, res) => {
  const { id } = req.params
  try {
    const result = await studentService.getStudentByIdFromDB(id)
    sendResponse<IStudent>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student fetched successfully!',
      data: result,
    })
  } catch (error: any) {
    throw new ApiError(httpStatus.BAD_REQUEST, error.message)
  }
}

//update student by id

const updateStudentById: RequestHandler = async (req, res) => {
  const { id } = req.params
  const { ...studentData } = req.body
  try {
    const result = await studentService.updateStudentByIdFromDB(id, studentData)
    sendResponse<IStudent>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student updated successfully!',
      data: result,
    })
  } catch (error: any) {
    throw new ApiError(httpStatus.BAD_REQUEST, error.message)
  }
}

//delete student by id

const deleteStudentById: RequestHandler = async (req, res) => {
  const { id } = req.params
  try {
    const result = await studentService.deleteStudentByIdFromDB(id)
    sendResponse<IStudent>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student deleted successfully!',
      data: result,
    })
  } catch (error: any) {
    throw new ApiError(httpStatus.BAD_REQUEST, error.message)
  }
}

export const studentController = {
  getAllStudents,
  getStudentById,
  deleteStudentById,
  updateStudentById,
}
