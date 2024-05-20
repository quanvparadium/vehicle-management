import { checkSchema } from 'express-validator'
import { validate } from '~/utils/validation'
import { USERS_MESSAGES } from '~/constants/messages'
import databaseService from '~/services/database.service'
import { ErrorWithStatus } from '~/models/Errors'
import HTTPSTATUS from '~/constants/httpStatus'
import { verifyToken } from '~/utils/jwt'

export const loginValidator = validate(
    checkSchema({
        username: {
            isString: true,
            notEmpty: true,
            custom: {
                options: async (value, { req }) => {
                    console.log('Value', value)
                    console.log('Password:', req.body.password)
                    const user = await databaseService.users.findOne({
                        username: value,
                        password: req.body?.password || ''
                    })
                    if (user === null) {
                        throw new ErrorWithStatus({
                            message: 'Tài khoản không tồn tại trong cơ sở dữ liệu',
                            status: HTTPSTATUS.BAD_REQUEST
                        })
                    }
                    console.log('Đăng nhập thành công')
                    req.user = user
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

export const accessTokenValidator = validate(
    checkSchema(
        {
            Authorization: {
                notEmpty: {
                    errorMessage: USERS_MESSAGES.ACCESS_TOKEN_IS_REQUIRED
                },
                custom: {
                    options: async (value, { req }) => {
                        // const access_token = value.replace('Bearer ', '')
                        const access_token = (value || '').split(' ')[1]
                        // console.log(value)
                        if (!access_token) {
                            throw new ErrorWithStatus({
                                message: USERS_MESSAGES.ACCESS_TOKEN_IS_REQUIRED,
                                status: HTTPSTATUS.UNAUTHORIZED
                            })
                        }
                        const decoded_authorization = await verifyToken({
                            token: access_token,
                            secretOrPublicKey: process.env.JWT_SECRET_ACCESS_TOKEN as string
                        })
                        req.decoded_authorization = decoded_authorization
                        return true
                    }
                }
            }
        },
        ['headers']
    )
)
