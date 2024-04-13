import { Request, Response, NextFunction } from 'express'
import { omit } from 'lodash'
import HTTPSTATUS from '~/constants/httpStatus'
import { ErrorWithStatus } from '~/models/Errors'

export const defaultErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ErrorWithStatus) {
        return res.status(err.status).json(omit(err, 'status'))
    } else {
        Object.getOwnPropertyNames(err).forEach((key) => {
            Object.defineProperty(err, key, { enumerable: true })
        })
        res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
            message: err.message,
            errorInfo: err
        })
        console.log(err)
    }
}
