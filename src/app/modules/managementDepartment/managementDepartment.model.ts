import { Schema, model } from 'mongoose'
import { IAcademicDepartment } from '../academicDepartment/academicDepartment.interface'

const ManagementDepartmentSchema = new Schema<IAcademicDepartment>(
  {
    title: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
)

export const managementDepartment = model(
  'ManagementDepartment',
  ManagementDepartmentSchema
)
