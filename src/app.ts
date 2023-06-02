import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import usersRouter from './app/modules/users/users.route'

export const app: Application = express()
app.use(cors())
app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/users', usersRouter)

app.get('/', (req: Request, res: Response) => {
  res.send('In the name of Allah')
})
