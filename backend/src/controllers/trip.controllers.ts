import { NextFunction, Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { TripReqBody } from '~/models/requests/Trip.requests'
import tripService from '~/services/trip.service'
import databaseService from '~/services/database.service'
import { Trip } from '~/models/schemas/Trip.schema'

export const getAllTripController = async (req: Request, res: Response) => {
    const result = await tripService.getAllTrip()
    return res.json({
        message: result.message,
        trips: result.trips
    })
}

export const createTripController = async (
    req: Request<ParamsDictionary, any, TripReqBody>,
    res: Response,
    next: NextFunction
) => {
    const result = await tripService.create(req.body)
    return res.json({
        message: result.message
    })
}

export const updateTripController = async (req: Request, res: Response) => {
    const result = await tripService.findAndUpdate(req.body.ExistTrip, req.body.Update) 
    return res.json({
        message: result.message,
        updatedTrip: result.updatedTrip
    })
}

export const deleteTripController = async (req: Request, res: Response) => {
    const result = await tripService.delete(req.body)
    return res.json({
        message: result.message,
        deletedTrip: result.deletedTrip
    })
}