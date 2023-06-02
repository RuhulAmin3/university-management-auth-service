import { Request, Response } from 'express'
import { createUserToDb } from './users.service'

export const createUserController = async (req: Request, res: Response) => {
  try {
    const { user } = req.body;
    const createdUser = await createUserToDb(user);
    res.status(200).json({
      success: true,
      message: 'user created successfully',
      data: createdUser,
    })
  } catch (err) {
    res.status(400).send({
      success: false,
      message: 'failed to create user',
    })
  }
}
