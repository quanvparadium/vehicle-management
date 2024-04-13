import databaseService from '~/services/database.service'
import Vehicle from '~/models/schemas/Vehicle.schema'
import { VehicleReqBody } from '~/models/requests/Vehicle.requests'

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
    async delete(payload: VehicleReqBody) {
        try {
            const vehicle = await databaseService.vehicles.findOne(payload);
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
    
}
const vehicleService = new vehiclesService()
export default vehicleService