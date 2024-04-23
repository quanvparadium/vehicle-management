import { ObjectId } from 'mongodb'
interface VehicleType {
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
    odometer: number
    recentMaintenanceDay: Date
    currentLocation: string
}
export class Vehicle {
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
    odometer: number
    recentMaintenanceDay: Date
    currentLocation: string
    constructor(vehicle: VehicleType) {
        this._id = vehicle._id || new ObjectId()
        this.Vehicle_id = vehicle.Vehicle_id
        this.type = vehicle.type
        this.model = vehicle.model
        this.licensePlates = vehicle.licensePlates
        this.frameNumber = vehicle.frameNumber
        this.chassisNumber = vehicle.chassisNumber
        this.state = vehicle.state
        this.on_trip = vehicle.on_trip
        this.fuelState = vehicle.fuelState
        this.odometer = vehicle.odometer 
        this.recentMaintenanceDay = vehicle.recentMaintenanceDay
        this.currentLocation = vehicle.currentLocation
    }
}