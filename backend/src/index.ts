import express from 'express'
import { urlencoded, json } from 'body-parser'
import cors from 'cors'
import apiRouter from '~/routes/api.routes'
import authRouter from './routes/auth.routes'
import vehicleRouter from './routes/vehicle.routes'
import databaseService from './services/database.service'
import { defaultErrorHandler } from '~/middlewares/errors.middlewares'
import dotenv from 'dotenv'
import driverRouter from './routes/driver.routes'
dotenv.config()

const app = express()
const port = process.env.BACKEND_PORT || 5002

databaseService.connect()

app.use(urlencoded({ extended: true }))
app.use(json())
app.use(cors())

// Router
app.use('/api', apiRouter)
app.use('/auth', authRouter)
app.use('/drivers', driverRouter)
app.use('/vehicles', vehicleRouter)
app.use(defaultErrorHandler)

databaseService.close()
app.listen(port, () => {
    console.log(`Backend đang lắng nghe tại http://localhost:${port}`)
})
