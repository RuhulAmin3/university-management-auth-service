import express, { Application, Request, Response, NextFunction } from 'express'
import cors from 'cors'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import ApiError from './errors/ApiError'
import UserRoutes from './app/modules/users/user.route'

export const app: Application = express()

app.use(cors())
app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/users', UserRoutes)

// app.get('/', (req: Request, res: Response, next: NextFunction) => {
//   console.log(x)
// })

// we need to put this code at last,this code run when there is no route match
app.all('*', (req, res, next) => {
  const err = new ApiError(404, `Can't find ${req.originalUrl} on this server!`)
  next(err)
})

// global error handler middleware
app.use(globalErrorHandler)
