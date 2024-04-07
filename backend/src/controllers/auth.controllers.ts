import HTTPSTATUS from '~/constants/httpStatus'
import { USERS_MESSAGES } from '~/constants/messages'
import { Request, Response } from 'express'
import User from '~/models/schemas/User.schema'
import usersService from '~/services/users.service'

export const loginController = async (req: Request, res: Response) => {
    const user = req.user as User
    console.log(user)
    const user_id = user?._id || 0
    console.log('Controller', user)
    console.log(user_id)
    const result = await usersService.login(user_id.toString())

    return res.status(HTTPSTATUS.ACCEPTED).json({
        role: user.role,
        fullname: user.fullname,
        message: USERS_MESSAGES.LOGIN_SUCCESS,
        result
    })
}
