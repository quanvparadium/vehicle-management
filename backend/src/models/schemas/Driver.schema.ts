import { ObjectId } from 'mongodb'

interface DriverType {
    _id?: ObjectId
    fullname: string
    email: string
    date_of_birth: Date
    identification: string
    address: string
    phone_number: string
    expire_license: Date
    experience: number
    status: string
}

export class Driver {
    _id: ObjectId
    fullname: string
    email: string
    date_of_birth: Date
    identification: string
    address: string
    phone_number: string
    expire_license: Date
    experience: number
    status: string

    constructor(driver: DriverType) {
        this._id = driver._id || new ObjectId()
        this.fullname = driver.fullname
        this.email = driver.email
        this.date_of_birth = driver.date_of_birth
        this.identification = driver.identification
        this.address = driver.address
        this.phone_number = driver.phone_number
        this.expire_license = driver.expire_license
        this.experience = driver.experience
        this.status = driver.status
    }
}