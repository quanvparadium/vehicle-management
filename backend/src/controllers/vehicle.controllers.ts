import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { VehicleReqBody } from '~/models/requests/Vehicle.requests'
import vehiclesService from '~/services/vehicle.service'
import databaseService from '~/services/database.service'
export const getVehicleController = async (req: Request, res: Response) => {
    const {id} =req.params
    const result = await vehiclesService.get(id)
    return res.json(result)
}
export const getALLVehicleController = async (req: Request, res: Response) => {
    const result = await databaseService.vehicles.find({}).toArray();
    if (!result) {
        return {
            message: 'Không có xe nào'
        }
    }
    return res.json(result)
}
export const CreateVehicleController = async (
    req: Request<ParamsDictionary, any, VehicleReqBody>, 
    res: Response
) => {
    const result = await vehiclesService.create(req.body)
    return res.json({
        message: result.message
    })
}
export const DeleteVehicleController = async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await vehiclesService.delete(id)
    return res.json({
        message: result.message
    })
}
export const updateVehicleController = async (req: Request, res: Response) => {
    const { id } = req.params
    const update = req.body

   const result = await vehiclesService.update(id,update);
   
    return res.json({
        message: result.message,
        updatedVehicle: result.updatedVehicle
    }); 
}