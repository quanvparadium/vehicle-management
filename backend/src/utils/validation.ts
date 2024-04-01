import { Request, Response, NextFunction } from 'express'
import { body, validationResult, ValidationChain } from 'express-validator'
import { RunnableValidationChains } from 'express-validator/src/middlewares/schema'
import HTTPSTATUS from '~/constants/httpStatus'
import { EntityError, ErrorWithStatus } from '~/models/Errors'

export const validate = (validations: RunnableValidationChains<ValidationChain>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        await validations.run(req)

        const errors = validationResult(req)
        console.log(errors)
        if (errors.isEmpty()) {
            return next()
        }
        const errorsObject = errors.mapped()
        const entityErrors = new EntityError({ errors: {} })
        for (const key in errorsObject) {
            const { msg } = errorsObject[key]
            if (msg instanceof ErrorWithStatus && msg.status !== HTTPSTATUS.UNPROCESSABLE_ENTITY) {
                console.log('TYPEOF MESSAGE 422: ', errorsObject[key])
                return next(msg)
            }
            // entityErrors.errors[key] = msg // Gán mỗi msg để chỉ xuất ra mỗi error message đối với từng lỗi
            entityErrors.errors[key] = errorsObject[key]
            /**
             * Nếu trả về errorsObject[key], thì chỗ ErrorsType phải để [key: string]: any,
             * còn nếu trả về msg như trên key thì không cần
             */
        }
        // res.status(422).json({
        //   errors: errors.array()
        // })
        // Or next(entityErrors)
        console.log('NEXT EXECUTE')
        next(entityErrors)
    }
}
