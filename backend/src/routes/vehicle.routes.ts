import { Router } from 'express'
/**
 * Vui lòng export Validator và Controller ở bên dưới
 */
// import { accessTokenValidator } from '~/middlewares/auth.middlewares'
// import { DriverValidator } from '~/middlewares/drivers.middlewares'
// import { getAllDriverController, createDriverController } from '~/controllers/driver.controllers'

// Khai báo router cho driver
const vehicleRouter = Router()

vehicleRouter.get('/', (req, res) => {
    return res.json(
        [
            {
                type: 'Xe hơi',
            },
            {
                type: 'Xe hơi',
            },
            {
                type: 'Xe hơi',
            },
        ]
    )
})

export default vehicleRouter
