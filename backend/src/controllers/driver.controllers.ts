import { NextFunction, Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { ObjectId } from 'mongodb'
import { DriverReqBody } from '~/models/requests/Driver.requests'
import databaseService from '~/services/database.service'
import driverService from '~/services/drivers.service'

export const getDriverController = async (req: Request, res: Response) => {
    const { id } = req.params
    // console.log(id)
    const result = await databaseService.drivers.findOne({ _id: new ObjectId(id) })
    // console.log(result)
    return res.json(result)
}

export const getAllDriverController = async (req: Request, res: Response) => {
    const result = await databaseService.drivers.find({}).toArray();
    // console.log('Backend result', result)

    return res.json(result)
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

export const updateDriverController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
  
    const { id } = req.params
    const data = req.body
    console.log(data)
    const result = await databaseService.drivers.findOneAndUpdate(
      {_id: new ObjectId(id)},
      {
        $set: {
          identification: data.identification,
          fullname: data.fullname
        }
      }
    )
    // console.log(result)

    return res.json({
      message: 'Update ok'
    })
    // const result = await databaseService.drivers.updateOne(
    //   { _id: ne},
    //   {}
    // )
}