import express, { Application, Request, Response } from 'express'
import cors from 'cors'
export const app: Application = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req: Request, res: any) => {
  res.send('in the name of Allah')
})
