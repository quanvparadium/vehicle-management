import { ObjectId } from 'mongodb';
export interface VehicleReqBody {
    _id: ObjectId
    Vehicle_id: ObjectId
    automaker: string
    type: string
    model: string
    licensePlates : string
    frameNumber: string
    chassisNumber: string
    state: string
    on_trip: boolean
    fuelState: number
    mileage: number
    recentMaintenanceDay: Date
    currentLocation: string
}