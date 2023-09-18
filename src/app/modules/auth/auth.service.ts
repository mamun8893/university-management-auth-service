import httpStatus from 'http-status';
import jwt, { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { User } from '../user/user.model';
import { ILoginUser, ILoginUserResponse } from './auth.iterface';

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { id, password } = payload;

  //create instance of user model
  const user = new User();
  //check user exists
  const isUserExists = await user.isUserExist(id);

  console.log('isUserExists', isUserExists);

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

  const { id: userId, role, needPasswordChange } = isUserExists;
  const accessToken = jwtHelpers.createToken(
    { userId, role },
    config.secret as Secret,
    config.expiration as string
  );

  const refreshToken = jwtHelpers.createToken(
    { userId, role },
    config.refresh_secret as Secret,
    config.refresh_expiration as string
  );
  return {
    accessToken,
    refreshToken,
    needPasswordChange,
  };
};

const refreshToken = async (refreshToken: string) => {
  //verify refresh token
  let verifyToken = null;
  try {
    verifyToken = jwt.verify(refreshToken, config.refresh_secret as Secret);
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid refresh token');
  }

  const { userId } = verifyToken as { userId: string; role: string };
  //checking deleted users token
  const user = new User();
  const isUserExists = await user.isUserExist(userId);
  if (!isUserExists) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  //generate new access token
  const newAccessToken = jwtHelpers.createToken(
    { userId: isUserExists.id, role: isUserExists.role },
    config.secret as Secret,
    config.expiration as string
  );
  return {
    accessToken: newAccessToken,
  };
};

export const authService = {
  loginUser,
  refreshToken,
};
