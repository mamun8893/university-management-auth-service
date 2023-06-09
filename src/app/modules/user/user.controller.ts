import { RequestHandler } from 'express'
import { userService } from './user.service'

const createUser: RequestHandler = async (req, res, next) => {
  const { user } = req.body
  try {
    const result = await userService.createUserToDB(user)
    res.status(200).json({
      success: true,
      message: 'create user success',
      data: result,
    })
  } catch (error: any) {
    next(error)
  }
}

export const userController = {
  createUser,
}
