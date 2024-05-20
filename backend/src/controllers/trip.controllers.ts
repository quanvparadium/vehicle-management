import { NextFunction, Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { TripReqBody } from '~/models/requests/Trip.requests'
import tripService from '~/services/trip.service'

import databaseService from '~/services/database.service'
import { Trip } from '~/models/schemas/Trip.schema'
import { Province } from '~/models/schemas/Trip.schema'
import("node-fetch")

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

interface ApiResponse {
    error: number;
    error_text: string;
    data_name: string;
    data: Province[];
  }

export const getProvinceController = async (req: Request, res: Response): Promise<void> => {
    const apiUrl = 'https://esgoo.net/api-tinhthanh/1/0.htm'

    try {
      const response = await fetch(apiUrl)
  
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`)
      }
  
      const apiData: ApiResponse = await response.json();
  
      const provinceNames = apiData.data.map(province => province.name)
  
      res.json({
        provinceNames
      })

    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  };

export const getVehiclesFilterController = async (req: Request, res: Response) => {
  try{
    const filterObject = {
        state : "AVAILABLE"
      };
    const result = await databaseService.vehicles.findOne(filterObject);
    if (!result) {
        return res.json({
            message: "Không tìm thấy phương tiện có sẵn"
        })
    }
    return res.json({
        result
    })
} catch(error) {
    return res.json({
        message: error.message
    })
    }
}