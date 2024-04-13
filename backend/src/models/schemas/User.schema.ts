import { ObjectId } from 'mongodb'
interface UserType {
    _id?: ObjectId
    fullname: string
    username: string
    email: string
    date_of_birth: Date
    password: string
    role: string
    avatar?: string // Optional
}

class User {
    _id: ObjectId
    fullname: string
    username: string
    email: string
    date_of_birth: Date
    password: string
    role: string
    avatar: string // Optional
    constructor(user: UserType) {
        this._id = user._id || new ObjectId()
        this.fullname = user.fullname
        this.username = user.username
        this.email = user.email
        this.date_of_birth = user.date_of_birth
        this.password = user.password
        this.role = user.role
        this.avatar = user.avatar || ''
    }
}

export default User
