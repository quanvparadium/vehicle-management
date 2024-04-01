import HTTPSTATUS from '~/constants/httpStatus'
import { USERS_MESSAGES } from '~/constants/messages'
import { Request, Response } from 'express'

export const loginController = (req: Request, res: Response) => {
    return res.json({
        message: 'OK'
    })
}
