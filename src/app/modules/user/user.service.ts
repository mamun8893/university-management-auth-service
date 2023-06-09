import config from '../../../config'
import ApiError from '../../../errors/ApiError'
import { IUser } from './user.interface'
import { User } from './user.model'
import { generateUserId } from './user.utils'

const createUserToDB = async (user: IUser) => {
  //auto generated incremental id
  const id = await generateUserId()
  user.id = id
  //default password
  if (!user.password) {
    user.password = config.userDefaultPassword as string
  }
  const createUser = await User.create(user)
  if (!createUser) {
    throw new ApiError(400, 'Failed to create user')
  }
  return createUser
}

export const userService = {
  createUserToDB,
}
