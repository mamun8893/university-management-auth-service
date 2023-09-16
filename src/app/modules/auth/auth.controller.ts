import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { authService } from './auth.service';

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  const result = await authService.loginUser(loginData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Login successful',
    data: result,
  });
});

export const authController = {
  loginUser,
};
