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
    
   

    async update(id: string, update: VehicleReqBody) {
        try {
            if (!ObjectId.isValid(id)) {
                console.log(id)
                return {
                    message: 'ID không hợp lệ'
                };
            }
    
            const existID = { _id: new ObjectId(id) };
            const updatedFields: Partial<VehicleReqBody> = {};

            // Xác định các trường cần được cập nhật
            if (update.type) {
                updatedFields.type = update.type;
            }
            if (update.model) {
                updatedFields.model = update.model;
            }
            // Thêm các trường cần cập nhật khác tại đây tương ứng với các trường trong VehicleReqBody

            const result = await databaseService.vehicles.updateOne(existID, { $set: updatedFields });

            if (result.modifiedCount > 0) {
                return {
                    message: 'Cập nhật thành công'      
                };
            } else {
                return {
                    message: 'Không có gì được cập nhật'
                };
            }
    
            // if (result) {
            //     return {
            //         message: 'Cập nhật thành công',
                 
            //     };
            // } else {
            //     return {
            //         message: 'Không tìm thấy phương tiện để cập nhật'
            //     };
            // }
        } catch (error) {
            console.error('Lỗi khi cập nhật phương tiện:', error);
            throw error;
        }
    }
   
    
    
}
const vehicleService = new vehiclesService()
export default vehicleService