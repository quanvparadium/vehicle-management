import { Router } from "express";
import { accessTokenValidator } from "~/middlewares/auth.middlewares";
import { getALLVehicleController, CreateVehicleController, DeleteVehicleController, updateVehicleController} from "~/controllers/vehicle.controller";
import {  CreateVehicleValidator,UpdateVehicleValidator,DeleteVehicleValidator } from "~/middlewares/vehicle.middlewares";

const vehicleRouter = Router()
/*decripsion: 'Get all vehicles from database'
path: /vehicles/
method: GET
header: { Authorization: Bearer <access_token> }*/
vehicleRouter.get('/', accessTokenValidator, getALLVehicleController) 

/*decripsion: 'Get all vehicles from database'
path: /vehicles/
method: POST
header: { Authorization: Bearer <access_token> }
body: { VehicleReqBody } 
{
    Vehicle_name: string
    Vehicle_id: ObjectId
    Driver_id: ObjectId
    Driver_name: string
    type: string
    model: string
    number_plate: string
    frame_number: string
    chassis_number: string
    state: string
    on_trip: boolean
    fuel_state: number
    runned_km: number
    date_recent_maintenance: Date
    date_next_maintenance: Date
    current_location: string
}

*/

vehicleRouter.post('/create_vehicle',accessTokenValidator,CreateVehicleValidator, CreateVehicleController)

vehicleRouter.delete('/del_vhc', accessTokenValidator,DeleteVehicleValidator, DeleteVehicleController)
    vehicleRouter.put('/update_vhc', accessTokenValidator, UpdateVehicleValidator, updateVehicleController);




export default vehicleRouter