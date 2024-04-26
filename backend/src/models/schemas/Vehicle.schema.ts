import { ObjectId } from 'mongodb'
interface VehicleType {
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
export class Vehicle {
    _id: ObjectId
    Vehicle_id: ObjectId
    type: string 
    licensePlates: string
    automaker: string
    model: string
    chassisNumber: string
    frameNumber: string
    state: string
    fuelState: number
    odometer: number
    recentMaintenanceDay: Date
    currentLocation: string
    notes: string
    constructor(vehicle: VehicleType) {
        this._id = vehicle._id || new ObjectId()
        this.Vehicle_id = vehicle.Vehicle_id
        this.type = vehicle.type
        this.model = vehicle.model
        this.licensePlates = vehicle.licensePlates
        this.automaker = vehicle.automaker
        this.frameNumber = vehicle.frameNumber
        this.chassisNumber = vehicle.chassisNumber
        this.state = vehicle.state
        this.fuelState = vehicle.fuelState
        this.odometer = vehicle.odometer 
        this.recentMaintenanceDay = vehicle.recentMaintenanceDay
        this.currentLocation = vehicle.currentLocation
        this.notes = vehicle.notes
    }
}