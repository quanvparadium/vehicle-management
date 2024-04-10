import { checkSchema } from 'express-validator'
import { validate } from '~/utils/validation'

export const DriverValidator = validate(
    checkSchema({
        fullname: {
            isString: true
        }
    })
)
