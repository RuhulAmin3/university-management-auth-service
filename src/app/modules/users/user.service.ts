import { IUser } from './user.interface'
import { User } from './user.model'
import config from '../../../config/index'
import { userGenerateId } from './user.utils'

export const createUserToDb = async (user: IUser): Promise<IUser | null> => {
  // auto generated Id
  const id = await userGenerateId()
  user.id = id

  // set default password
  if (!user.password) {
    user.password = config.default_user_pass as string
  }

  const createdUser = await User.create(user)

  if (!createdUser) {
    throw new Error('failed to create user')
  }
  return createdUser
}
