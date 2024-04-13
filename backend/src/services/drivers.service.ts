import databaseService from '~/services/database.service'
import { DriverReqBody } from '~/models/requests/Driver.requests'
import { Driver } from '~/models/schemas/Driver.schema'

class DriverService {
    async create(payload: DriverReqBody) {
        const result = await databaseService.drivers.insertOne(
            new Driver({
                ...payload
            })
        )
        return {
            message: 'Tạo thành công'
        }
    }
}

const driverService = new DriverService()
export default driverService
