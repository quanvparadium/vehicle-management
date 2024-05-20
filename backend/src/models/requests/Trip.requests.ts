import { ObjectId } from "mongodb"
export interface TripReqBody {
    _id?: ObjectId
    driver_id: string
    vehicle_id: string
    price: number
    status : string
    starting_point: string
    destination: string
    pathway : string
    distance : number
    date_of_departure: Date
    date_of_arrival: Date  
    expected_time : number  
}