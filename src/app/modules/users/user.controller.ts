import { RequestHandler } from 'express'
import { createUserToDb } from './user.service'

export const createUserController: RequestHandler = async (req, res, next) => {
  try {
    const { user } = req.body
    const createdUser = await createUserToDb(user)
    res.status(200).json({
      success: true,
      message: 'user created successfully',
      data: createdUser,
    })
  } catch (err) {
    next(err)
  }
}
