import { Model, Types } from 'mongoose'
import { IManagementDepartment } from '../managementDepartment/managementDepartment.interface'

type UserName = {
  firstName: string
  middleName?: string
  lastName: string
}

type BloodGroup = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']

export type IAdmin = {
  id: string
  name: UserName
  dateOfBirth: string
  email: string
  contactNo: string
  emergencyContactNo: string
  gender: 'male' | 'female'
  presentAddress: string
  permanentAddress: string
  bloodGroup?: BloodGroup
  managementDepartment: Types.ObjectId | IManagementDepartment
  designation: string
  profileImage?: string
}

export type IAdminFilters = {
  searchTerm?: string
  id?: string
  bloodGroup?: string
  email?: string
  contactNo?: string
  emergencyContactNo?: string
}

export type AdminModel = Model<IAdmin, Record<string, unknown>>
