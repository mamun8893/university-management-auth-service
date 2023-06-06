import { Request, Response } from 'express'
import userService from './user.service'

const createUser = async (req: Request, res: Response) => {
  const { user } = req.body
  try {
    const result = await userService.createUserToDB(user)
    res.status(200).json({
      success: true,
      message: 'create user success',
      data: result,
    })
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    })
  }
}

export default {
  createUser,
}
