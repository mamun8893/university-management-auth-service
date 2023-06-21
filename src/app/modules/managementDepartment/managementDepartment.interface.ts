import { Model } from 'mongoose'

export type IManagementDepartment = {
  title: string
}

export type IManagementDepartmentFilter = {
  searchTerm?: string
  title?: string
}

export type ManagementDepartmentModel = Model<
  IManagementDepartment,
  Record<string, unknown>
>
