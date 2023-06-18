import config from '../../../config'
import ApiError from '../../../errors/ApiError'
import { AcademicSemester } from '../academicSemester/academicSemester.model'
import { IStudent } from '../student/student.interface'
import { IUser } from './user.interface'

import { generateStudentId } from './user.utils'
import mongoose from 'mongoose'
import { Student } from '../student/student.model'
import httpStatus from 'http-status'
import { User } from './user.model'

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

export const userService = {
  createStudentToDB,
}
