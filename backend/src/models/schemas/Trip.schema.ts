import { ObjectId } from 'mongodb'

interface TripType {
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
    driver_name : string
    vehicle_name : string
}

export class Trip {
    _id : ObjectId
    driver_id: string
    vehicle_id: string
    driver_name: string
    vehicle_name: string
    price: number
    status : string
    starting_point: string
    destination: string
    pathway : string
    distance : number
    date_of_departure: Date
    date_of_arrival: Date  
    expected_time : number  


    constructor(trip: TripType) {
        this._id = trip._id;
        this.driver_id = trip.driver_id;
        this.vehicle_id = trip.vehicle_id;
        this.driver_name = trip.driver_name
        this.vehicle_name = trip.vehicle_name
        this.price = trip.price;
        this.status = trip.status;
        this.starting_point = trip.starting_point;
        this.destination = trip.destination;
        this.pathway = trip.pathway;
        this.distance = trip.distance;
        this.date_of_departure = trip.date_of_departure;
        this.date_of_arrival = trip.date_of_arrival;
        this.expected_time = trip.expected_time;
        this.driver_name = trip.driver_name;
        this.vehicle_name = trip.vehicle_name;
    }
}

export interface Province {
    id: string;
    name: string;
    name_en: string;
    full_name: string;
    full_name_en: string;
    latitude: string;
    longitude: string;
  }