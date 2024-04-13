import { ObjectId } from 'mongodb'
interface VehicleType {
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
class Vehicle {
    _id: ObjectId
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
    fuel_state: number
    runned_km: number
    date_recent_maintenance: Date
    date_next_maintenance: Date
    current_location: string
    constructor(vehicle: VehicleType) {
        this._id = vehicle._id || new ObjectId()
        this.Vehicle_id = vehicle.Vehicle_id
        this.Driver_id = vehicle.Driver_id
        this.Vehicle_name = vehicle.Vehicle_name
        this.Driver_name = vehicle.Driver_name
        this.type = vehicle.type
        this.model = vehicle.model
        this.number_plate = vehicle.number_plate
        this.frame_number = vehicle.frame_number
        this.chassis_number = vehicle.chassis_number
        this.state = vehicle.state
        this.fuel_state = vehicle.fuel_state
        this.runned_km = vehicle.runned_km
        this.date_recent_maintenance = vehicle.date_recent_maintenance
        this.date_next_maintenance = vehicle.date_next_maintenance
        this.current_location = vehicle.current_location
    }
}
export default Vehicle

