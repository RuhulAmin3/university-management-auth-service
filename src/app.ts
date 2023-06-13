import express, { Application, Response, NextFunction, Request } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routes from './app/routes';
import httpStatus from 'http-status';
// import ApiError from './errors/ApiError';
// import httpStatus from 'http-status';
export const app: Application = express();

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/', routes);

// app.get('/', (req: Request, res: Response, next: NextFunction) => {
//   console.log(x)
// })

// we need to put this code at last,this code run when there is no route match (not found error handle)
// app.all('*', (req, res, next) => {
//   const err = new ApiError(
//     httpStatus.NOT_FOUND,
//     `Can't find ${req.originalUrl} on this server!`
//   );
//   next(err);
// });

// global error handler middleware
app.use(globalErrorHandler);

// not found error handle alternatively

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not found api',
    errorMessages: [{ path: req.originalUrl, message: 'API Not found' }],
  });
  next();
});
