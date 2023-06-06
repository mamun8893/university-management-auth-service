import express, { Application } from 'express'
import cors from 'cors'
import userRoutes from './app/modules/user/user.route'
const app: Application = express()

//use cors middleware
app.use(cors())

//use json middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Api Route

app.use('/api/v1/users', userRoutes)

export default app
