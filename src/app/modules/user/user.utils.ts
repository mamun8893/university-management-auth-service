import { IAcademicSemester } from '../academicSemester/academicSemester.interface'
import { User } from './user.model'

export const fundLastUserId = async () => {
  const lastStudent = await User.findOne({}, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean()
  return lastStudent?.id ? lastStudent?.id.substring(4) : undefined || 0
}

export const findLastAdminId = async (): Promise<string | undefined> => {
  const lastAdmin = await User.findOne({ role: 'admin' }, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean()

  return lastAdmin?.id ? lastAdmin.id.substring(2) : undefined
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

export const generateAdminId = async (): Promise<string> => {
  const currentId = (await findLastAdminId()) || (0).toString().padStart(5, '0')
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0')
  incrementedId = `A-${incrementedId}`

  return incrementedId
}
