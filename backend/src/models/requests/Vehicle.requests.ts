import { ObjectId } from 'mongodb';
export interface VehicleReqBody {
    _id?: ObjectId
    Vehicle_id: ObjectId
    Vehicle_name: string
    Driver_id: ObjectId
    Driver_name: string
    type: string
    model: string
    number_plate: string
    frame_number: string
    chassis_number: string
    state: string
    fuel_state: number
    runned_km: number
    date_recent_maintenance: Date
    date_next_maintenance: Date
    current_location: string
}