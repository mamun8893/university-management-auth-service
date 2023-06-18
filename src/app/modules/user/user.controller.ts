import { RequestHandler } from 'express'
import { userService } from './user.service'
import sendResponse from '../../../shared/sendResponse'
import { IUser } from './user.interface'
import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'

const createStudent: RequestHandler = async (req, res) => {
  const { student, ...userData } = req.body
  try {
    const result = await userService.createStudentToDB(student, userData)
    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User created successfully!',
      data: result,
    })
  } catch (error: any) {
    throw new ApiError(httpStatus.BAD_REQUEST, error.message)
  }
}

export const userController = {
  createStudent,
}
