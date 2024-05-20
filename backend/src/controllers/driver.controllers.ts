import { NextFunction, Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core/index'
import { ObjectId } from 'mongodb'
import { DriverReqBody } from '~/models/requests/Driver.requests'
import databaseService from '~/services/database.service'
import driverService from '~/services/drivers.service'

export const getDriverController = async (req: Request, res: Response) => {
    const { id } = req.params
    // console.log(id)
    const result = await databaseService.drivers.findOne({ _id: new ObjectId(id) })
    // console.log(result)
    return res.json({Drivers: result})
}

export const getAllDriverController = async (req: Request, res: Response) => {
    try {
    const result = await databaseService.drivers.find({}).toArray();
    
    if (!result || result.length === 0) {
      return res.status(404).json({
        message: "No drivers found"
      });
    }

    return res.json({ Drivers: result });
  } catch (error) {
    console.error('Error fetching drivers:', error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
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

export const updateDriverController = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    const data = req.body
    console.log(data)
    const result = await databaseService.drivers.findOneAndUpdate(
        { _id: new ObjectId(id) },
        {
            $set: {
                data
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

export const deleteDriverController = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params

    try {
        const result = await databaseService.drivers.deleteOne({ _id: new ObjectId(id) })

        if (result.deletedCount === 1) {
            return res.json({
                message: 'Driver deleted successfully'
            })
        } else {
            return res.status(404).json({
                message: 'Driver not found'
            })
        }
    } catch (error) {
        next(error)
    }
}
