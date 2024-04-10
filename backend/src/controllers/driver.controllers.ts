import { NextFunction, Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { DriverReqBody } from '~/models/requests/Driver.requests'
import driverService from '~/services/drivers.service'

export const getAllDriverController = async (req: Request, res: Response) => {
    return res.json({
        id: 1,
        driver_name: 'Nguyễn Văn A'
    })
}

export const createDriverController = async (
    req: Request<ParamsDictionary, any, DriverReqBody>,
    res: Response,
    next: NextFunction
) => {
    const result = await driverService.create(req.body)
    return res.json({
        message: result.message
    })
}
