import { RequestHandler } from 'express'
import { userService } from './user.service'
import sendResponse from '../../../shared/sendResponse'
import { IUser } from './user.interface'
import httpStatus from 'http-status'

const createUser: RequestHandler = async (req, res) => {
  const { ...userData } = req.body
  try {
    const result = await userService.createUserToDB(userData)
    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User created successfully!',
      data: result,
    })
  } catch (error: any) {
    console.log(error)
  }
}

export const userController = {
  createUser,
}
