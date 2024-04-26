import { ObjectId } from 'mongodb';
export interface VehicleReqBody {
    _id: ObjectId
    Vehicle_id: ObjectId
    type: string ,
    licensePlates: string,
    automaker: string,
    model: string,
    chassisNumber: string,
    frameNumber: string,
    state: string,
    fuelState: number,
    odometer: number,
    recentMaintenanceDay: Date,
    currentLocation: string,
    notes: string
}