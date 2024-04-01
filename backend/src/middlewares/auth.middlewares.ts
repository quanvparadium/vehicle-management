import { checkSchema } from 'express-validator'
import { validate } from '~/utils/validation'
import { USERS_MESSAGES } from '~/constants/messages'
import databaseService from '~/services/database.service'
import { ErrorWithStatus } from '~/models/Errors'
import HTTPSTATUS from '~/constants/httpStatus'

export const loginValidator = validate(
    checkSchema({
        username: {
            isString: true,
            notEmpty: true,
            custom: {
                options: async (value, { req }) => {
                    console.log('Value', value)
                    console.log('Password:', req.body.password)
                    const result = await databaseService.users.findOne({
                        username: value,
                        password: req.body?.password || ''
                    })
                    if (result === null) {
                        throw new ErrorWithStatus({
                            message: 'Tài khoản không tồn tại trong cơ sở dữ liệu',
                            status: HTTPSTATUS.BAD_REQUEST
                        })
                    }
                    console.log('Đăng nhập thành công')
                    return true
                }
            }
        },
        password: {
            notEmpty: true,
            isString: true,
            isLength: {
                options: {
                    min: 6,
                    max: 50
                },
                errorMessage: USERS_MESSAGES.PASSWORD_LENGTH_MUST_BE_FROM_6_TO_50
            }
        }
    })
)

// Example Validator
// export const loginValidator = validate(
//     checkSchema({
//
//     })
// )
