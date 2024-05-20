import { Router } from 'express'
import { accessTokenValidator } from '~/middlewares/auth.middlewares'
import { DriverValidator } from '~/middlewares/drivers.middlewares'
import {
    getAllDriverController,
    createDriverController,
    getDriverController,
    updateDriverController,
    deleteDriverController
} from '~/controllers/driver.controllers'

const driverRouter = Router()

/**
 * Description: Get all drivers from database
 * Path: /drivers/
 * Method: GET
 * Header: { Authorization: Bearer <access_token> }
 */
driverRouter.get('/', accessTokenValidator, getAllDriverController)

/**
 * Description: Get a specific driver by ID
 * Path: /drivers/:id
 * Method: GET
 * Header: { Authorization: Bearer <access_token> }
 */
driverRouter.get('/:id', accessTokenValidator, getDriverController)

/**
 * Description: Create a new driver
 * Path: /drivers/
 * Method: POST
 * Header: { Authorization: Bearer <access_token> }
 * Body: { DriverReqBody } or more specific:
 * {
 *     fullname: string,
 *     email: string,
 *     identification: string,
 *     ...,
 *     ...
 * }
 */
driverRouter.post('/', accessTokenValidator, DriverValidator, createDriverController)

/**
 * Description: Update an existing driver
 * Path: /drivers/:id
 * Method: PUT
 * Header: { Authorization: Bearer <access_token> }
 * Body: { DriverReqBody } or more specific:
 * {
 *     fullname: string,
 *     email: string,
 *     identification: string,
 *     ...,
 *     ...
 * }
 */
driverRouter.put('/:id', accessTokenValidator, updateDriverController)

/**
 * Description: Delete a driver by ID
 * Path: /drivers/:id
 * Method: DELETE
 * Header: { Authorization: Bearer <access_token> }
 */
driverRouter.delete('/:id', accessTokenValidator, deleteDriverController)

export {
    DriverValidator,
    getAllDriverController,
    createDriverController,
    getDriverController,
    updateDriverController,
    deleteDriverController
}
export default driverRouter
