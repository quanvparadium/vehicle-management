import databaseService from '~/services/database.service'
import { DriverReqBody } from '~/models/requests/Driver.requests'
import { Driver } from '~/models/schemas/Driver.schema'
import { ObjectId } from 'mongodb'
import { update } from 'lodash'
class DriverService {
    async create(payload: DriverReqBody) {
        const result = await databaseService.drivers.insertOne(
            new Driver({
                ...payload
            })
        )
        return {
            message: 'Tạo tài xế thành công'
        }
    }

    async findAndUpdate(id: string, update: DriverReqBody) {
        try {
            const result = await databaseService.drivers.findOneAndUpdate(
                { _id: new ObjectId(id) },
                { $set: update },
                { returnDocument: 'after' }
            )
            const updatedDriver = await databaseService.drivers.findOne({ _id: new ObjectId(id) })
            if (updatedDriver) {
                return {
                    message: 'Cập nhật tài xế thành công',
                    updatedDriver
                }
            } else {
                return {
                    message: 'Không tìm thấy tài xế để cập nhật'
                }
            }
        } catch (error) {
            console.error('Lỗi, chưa thể cập nhật:', error)
        }
    }

    async delete(id: string) {
        try {
            const result = await databaseService.drivers.deleteOne({ _id: new ObjectId(id) })
            if (result.deletedCount === 1) {
                const deletedDriver = await databaseService.drivers.findOne({ _id: new ObjectId(id) })
                return {
                    message: 'Xoá tài xế thành công',
                    deletedDriver
                }
            } else {
                return {
                    message: 'Không tìm thấy tài xế'
                }
            }
        } catch (error) {
            console.error('Lỗi, chưa thể xoá:', error)
            throw error
        }
    }

    async getAll() {
        try {
            const drivers = await databaseService.drivers.find({}).toArray()
            if (!drivers || drivers.length === 0) {
                return {
                    message: 'Không có tài xế nào'
                }
            }
            return {
                drivers
            }
        } catch (error) {
            console.error('Lỗi, chưa get được:', error)
        }
    }
}

const driverService = new DriverService()
export default driverService
