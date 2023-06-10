import express, { Application } from 'express'
import cors from 'cors'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import routers from './routes/routes'

const app: Application = express()

//use cors middleware
app.use(cors())

//use json middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Api Route

app.use('/api/v1', routers)

//testong error
// app.get('/error', async (req, res, next) => {
//   //   Promise.reject(new Error('Unhandle Promise Rejection'))
//   //   console.log(x)
// })
//Global Error Handler
app.use(globalErrorHandler)

export default app
