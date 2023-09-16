import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { User } from '../user/user.model';
import { ILoginUser } from './auth.iterface';

const loginUser = async (payload: ILoginUser) => {
  const { id, password } = payload;

  //create instance of user model
  const user = new User();
  //check user exists
  const isUserExists = await user.isUserExist(id);

  if (!isUserExists) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  //check password match

  if (
    isUserExists.password &&
    !user.isPasswordMatch(password, isUserExists.password)
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect password');
  }

  //create jwt token

  return {};
};

export const authService = {
  loginUser,
};
