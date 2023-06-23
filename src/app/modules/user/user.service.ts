import config from '../../../config'
import ApiError from '../../../errors/ApiError'
import { AcademicSemester } from '../academicSemester/academicSemester.model'
import { IStudent } from '../student/student.interface'
import { IUser } from './user.interface'

import { generateAdminId, generateStudentId } from './user.utils'
import mongoose from 'mongoose'
import { Student } from '../student/student.model'
import httpStatus from 'http-status'
import { User } from './user.model'
import { IAdmin } from '../admin/admin.interface'
import { Admin } from '../admin/admin.model'

const createStudentToDB = async (student: IStudent, user: IUser) => {
  //set default password
  if (!user.password) {
    user.password = config.default_student_password as string
  }

  //set role
  user.role = 'student'
  //academic semester get
  const academicSemester = await AcademicSemester.findById(
    student.academicSemester
  )

  const session = await mongoose.startSession()
  try {
    session.startTransaction()

    let newUserAllData = null
    //generate student id
    const id = await generateStudentId(academicSemester)

    //set  id in student and user id same value
    student.id = id
    user.id = id

    //create new student
    const newStudent = await Student.create([student], { session: session }) //return single array
    if (!newStudent.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to creating student')
    }

    //set student _id into user
    user.student = newStudent[0]._id

    //create new user
    const newUser = await User.create([user], { session: session }) //return single array
    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to creating user')
    }

    newUserAllData = newUser[0]

    await session.commitTransaction()
    await session.endSession()

    if (newUserAllData) {
      newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
        path: 'student',
        populate: [
          {
            path: 'academicSemester',
          },
          {
            path: 'academicDepartment',
          },
          {
            path: 'academicFaculty',
          },
        ],
      })
    }

    return newUserAllData
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw new ApiError(httpStatus.BAD_REQUEST, `${error}`)
  }
}

const createAdminToDB = async (admin: IAdmin, user: IUser) => {
  //set user password
  if (!user.password) {
    user.password = config.default_admin_password as string
  }
  //set role
  user.role = 'admin'

  const session = await mongoose.startSession()
  try {
    session.startTransaction()

    let newUserAllData = null
    //set id in admin and user id same value

    const id = await generateAdminId()
    admin.id = id
    user.id = id

    //create new admin

    const newAdmin = await Admin.create([admin], { session: session }) //return single array

    if (!newAdmin.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to creating admin')
    }

    //set admin _id into user

    user.admin = newAdmin[0]._id

    //create new user

    const newUser = await User.create([user], { session: session }) //return single array

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to creating user')
    }

    newUserAllData = newUser[0]

    await session.commitTransaction()
    await session.endSession()

    if (newUserAllData) {
      newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
        path: 'admin',
        populate: [
          {
            path: 'managementDepartment',
          },
        ],
      })
    }
    return newUserAllData
  } catch (error) {
    console.log('error->', error)

    await session.abortTransaction()
    await session.endSession()
    throw new ApiError(httpStatus.BAD_REQUEST, `${error}`)
  }
}

export const userService = {
  createStudentToDB,
  createAdminToDB,
}
