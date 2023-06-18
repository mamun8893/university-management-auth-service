import { IAcademicSemester } from '../academicSemester/academicSemester.interface'
import { User } from './user.model'

export const fundLastUserId = async () => {
  const lastStudent = await User.findOne({}, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean()
  return lastStudent?.id ? lastStudent?.id.substring(4) : undefined || 0
}

export const generateStudentId = async (
  academicSemester: IAcademicSemester | any
) => {
  const lastUserId = await fundLastUserId()
  const currentId = lastUserId.toString().padStart(5, '0')
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0')
  incrementedId = `${academicSemester.year.toString().substring(2, 4)}${
    academicSemester.code
  }${incrementedId}`
  return incrementedId
}
