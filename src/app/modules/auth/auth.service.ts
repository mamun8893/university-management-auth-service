import httpStatus from 'http-status';
import jwt, { Secret } from 'jsonwebtoken';
import config from '../../../config';
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

  console.log(config.secret, config.expiration);

  const accessToken = jwt.sign(
    {
      id: isUserExists.id,
      role: isUserExists.role,
    },
    config.secret as Secret,
    {
      expiresIn: config.expiration,
    }
  );

  const refreshToken = jwt.sign(
    {
      id: isUserExists.id,
      role: isUserExists.role,
    },
    config.refresh_secret as Secret,
    {
      expiresIn: config.refresh_expiration,
    }
  );

  // const refreshToken = jwt.sign(
  //   {
  //     id: isUserExists.id,
  //     role: isUserExists.role,
  //   },
  //   config.refresh_secret as Secret,
  //   {
  //     expiresIn: config.refresh_secret,
  //   }
  // );

  console.log(accessToken, refreshToken, isUserExists.needPasswordChange);

  return {
    accessToken,
    refreshToken,
    needPasswordChange: isUserExists.needPasswordChange,
  };
};

export const authService = {
  loginUser,
};
