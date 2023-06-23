//get all students

import httpStatus from 'http-status'
import { paginationFields } from '../../../constant/pagination'
import pick from '../../../shared/pick'
import sendResponse from '../../../shared/sendResponse'
import { adminFilterableFields } from './admin.constant'
import { IAdmin } from './admin.interface'
import { adminService } from './admin.service'
import { RequestHandler } from 'express'

const getAllAdmin: RequestHandler = async (req, res, next) => {
  const filters = pick(req.query, adminFilterableFields)
  const paginationOption = pick(req.query, paginationFields)

  try {
    const result = await adminService.getAllAdminFromDB(
      filters,
      paginationOption
    )
    sendResponse<IAdmin[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Get all admin successfully!',
      meta: result.meta,
      data: result.data,
    })
  } catch (error) {
    next(error)
  }
}

export const adminController = {
  getAllAdmin,
}
