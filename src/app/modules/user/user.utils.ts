import { User } from './user.model'

export const fundLastUserId = async () => {
  const lastUser = await User.findOne({}, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean()
  return lastUser?.id || 0
}

export const generateUserId = async () => {
  const lastUserId = await fundLastUserId()
  const currentId = lastUserId.toString().padStart(5, '0')
  const incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0')
  return incrementedId
}
