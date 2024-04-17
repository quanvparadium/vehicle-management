import { Request, Response } from 'express'
import vehiclesService from '~/services/vehicles.services'


export const getALLVehicleController = async (req: Request, res: Response) => {
    const result = await  vehiclesService.getAll()
    return res.json(result)
}
export const CreateVehicleController = async (req: Request, res: Response) => {
    const result = await vehiclesService.create(req.body)
    return res.json({
        message: result.message
    })
}
export const DeleteVehicleController = async (req: Request, res: Response) => {
    const result = await vehiclesService.delete(req.body)
    return res.json({
        message: result.message
    })
}
export const updateVehicleController = async (req: Request, res: Response) => {
   const result = await vehiclesService.update(req.body.existingVehicle, req.body.update);
    return res.json({
        message: result.message,
        updatedVehicle: result.updatedVehicle
    }); 
}
