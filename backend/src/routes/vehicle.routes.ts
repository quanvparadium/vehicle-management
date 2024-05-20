import { Router } from "express";
import { accessTokenValidator } from "~/middlewares/auth.middlewares";
import { getALLVehicleController, CreateVehicleController, DeleteVehicleController, updateVehicleController, getVehicleController} from "~/controllers/vehicle.controllers";
import {  CreateVehicleValidator,UpdateVehicleValidator } from "~/middlewares/vehicle.middlewares";

const vehicleRouter = Router()

vehicleRouter.get('/', getALLVehicleController) 
vehicleRouter.post('/',CreateVehicleValidator, CreateVehicleController)

vehicleRouter.delete('/:id', DeleteVehicleController)
vehicleRouter.put('/:id', UpdateVehicleValidator, updateVehicleController);
vehicleRouter.get('/:id', getVehicleController)


export default vehicleRouter