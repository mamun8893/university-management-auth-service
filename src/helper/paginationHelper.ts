import { SortOrder } from 'mongoose'

type IPaginationOption = {
  page?: number
  limit?: number
  skip?: number
  sortBy?: string
  sortOrder?: SortOrder
}

type IPaginationResult = {
  page: number
  limit: number
  skip: number
  sortBy: string
  sortOrder: SortOrder
}

const calculatePagination = (option: IPaginationOption): IPaginationResult => {
  //page and limit
  const page = option.page || 1
  const limit = option.limit || 10
  const skip = (page - 1) * limit

  //sort by and sort order
  const sortBy = option.sortBy || 'createdAt'
  const sortOrder = option.sortOrder || 'desc'

  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
  }
}

export const paginationHelper = {
  calculatePagination,
}
