import databaseService from '~/services/database.service'
import {Vehicle} from '~/models/schemas/Vehicle.schema'
import { VehicleReqBody } from '~/models/requests/Vehicle.requests'
import { ObjectId } from 'mongodb'

class vehiclesService {
    async getAll() {
        try {
            const result = await databaseService.vehicles.find({}).toArray();
            if (!result) {
                return {
                    message: 'Không có xe nào'
                }
            }
            return {
                result
            }
        } catch (error) {
            console.error('Lỗi: ', error);
        }
    }

    async get(id: string) {
        try {
            const result = await databaseService.vehicles.findOne({ _id: new ObjectId(id) });
            if (!result) {
                return {
                    message: 'Không tìm thấy phương tiên'
                }
            }
            return {
                result
            }
        } catch (error) {
            console.error('Lỗi: ', error);
        }
    }
    async create(payload: VehicleReqBody) {
        const result = await databaseService.vehicles.insertOne(
            new Vehicle({
                ...payload
            })       
        )
        return {
            message: 'Tạo thành công'
        }
    }
    async delete(id: string) {
        try {
            const vehicle = await databaseService.vehicles.findOne({ _id: new ObjectId(id) });
            if (!vehicle) {
                return { message: 'Phương tiện không tồn tại' }; 
            }
    
            const result = await databaseService.vehicles.deleteOne({ _id: vehicle._id }); 
            if (result.deletedCount === 0) {
                return { message: 'Không có phương tiện nào được xóa' };
            }
    
            return { message: 'Xóa thành công'};
        } catch (error) {
            console.error('Lỗi: ', error);
            return { message: 'Có lỗi xảy ra trong quá trình xóa' }; 
        }
    }
    
    async update(id:string , update: VehicleReqBody) {
        try {
            const existID = { _id: new ObjectId(id) }
            const result = await databaseService.vehicles.findOneAndUpdate( existID,{ $set: update });    
            if (result) {
                return {
                    message: 'Cập nhật thành công',
                    result
                };
            } else {
                return {
                    message: 'Không tìm thấy phương tiện để cập nhật'
                };
            }
        } catch (error) {
            console.error('Lỗi khi cập nhật phương tiện:', error);
            throw error;
        }
    }
    
    
    
    
    
}
const vehicleService = new vehiclesService()
export default vehicleService