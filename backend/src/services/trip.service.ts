import databaseService from '~/services/database.service'
import { TripReqBody } from '~/models/requests/Trip.requests'
import { Trip } from '~/models/schemas/Trip.schema'
import { update } from 'lodash'
import { ObjectId } from 'mongodb'

class TripService {
    async create(payload: TripReqBody) {
        const result = await databaseService.trips.insertOne(
            new Trip({
                ...payload
            })
        )
        const temp = await databaseService.vehicles.findOne(payload._id);
        const Update = {
            odometer : payload.distance + temp.odometer,
         }
         const filterObject = {
            chassisNumber : String(payload.vehicle_id)
         }
        const vehicle = await databaseService.vehicles.findOneAndUpdate(filterObject, { $set: Update })
    
        return {
            
            message: 'Tạo thành công'
        }
    }
    
    async findAndUpdate(ExistTrip: Trip, Update: TripReqBody) {
        try {
            ExistTrip._id = new ObjectId(ExistTrip._id)
            const result = await databaseService.trips.findOneAndUpdate(ExistTrip, { $set: Update })
            const updatedTrip = await databaseService.trips.findOne(ExistTrip);
            if (result) {
                return {
                    message: 'Update thành công, trip mới:',
                    updatedTrip
                }
            }
            else {
                return {
                    message: 'Không tìm thấy trip để update'
                }
            }
        } catch (error) {
            console.error("Lỗi, chưa thể update:", error)
        }
    }

    async delete(ExistTrip: TripReqBody){
        try{
            ExistTrip._id = new ObjectId(ExistTrip._id)
            const deletedTrip = await databaseService.trips.findOne(ExistTrip);
            const result = await databaseService.trips.deleteOne(ExistTrip)
            if (result.deletedCount == 1) {
                result.deletedCount = 0
                return {
                    message: 'Xóa thành công, trip đã xóa:',
                    deletedTrip
                }
            }
            else {
                return {
                    message: 'Không tìm thấy trip'
                }
            }
        } catch(error) {
            console.log("Lỗi, chưa thể xóa:", error)
        }
    }

    async getAllTrip(){
        try {
            const trips = await databaseService.trips.find({}).toArray();
            if (!trips || trips.length == 0) {
                return {
                    message: 'Không có chuyến xe nào'
                }
            }
            return {
                trips
            }
        } catch (error) {
            console.error('Lỗi, chưa get được: ', error);
        }
    }
}

const tripService = new TripService()
export default tripService