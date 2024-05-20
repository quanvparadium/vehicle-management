import { checkSchema } from 'express-validator'
import { validate } from '~/utils/validation'
import databaseService from '~/services/database.service'
import { ErrorWithStatus } from '~/models/Errors'

export const DriverValidator = validate(
    checkSchema({
        fullname: {
            isString: true,
            notEmpty: {
                errorMessage: 'Tên không được để trống'
            }
        },
        email: {
            isEmail: {
                errorMessage: 'Email không hợp lệ'
            },
            trim: true,
            notEmpty: {
                errorMessage: 'Email là bắt buộc'
            },
            custom: {
                options: async (value) => {
                    const driver = await databaseService.drivers.findOne({ email: value })
                    if (driver) {
                        throw new ErrorWithStatus({
                            message: 'Email đã tồn tại trong hệ thống',
                            status: 400
                        })
                    }
                    return true
                }
            }
        },
        date_of_birth: {
            isDate: {
                errorMessage: 'Ngày sinh không hợp lệ'
            },
            trim: true,
            notEmpty: {
                errorMessage: 'Ngày sinh là bắt buộc'
            }
        },
        identification: {
            isString: {
                errorMessage: 'Số căn cước phải là chuỗi'
            },
            trim: true,
            notEmpty: {
                errorMessage: 'Số căn cước là bắt buộc'
            },
            custom: {
                options: async (value) => {
                    const driver = await databaseService.drivers.findOne({ identification: value })
                    if (driver) {
                        throw new ErrorWithStatus({
                            message: 'Số căn cước đã tồn tại trong hệ thống',
                            status: 400
                        })
                    }
                    return true
                }
            }
        },
        address: {
            isString: {
                errorMessage: 'Địa chỉ phải là chuỗi'
            },
            trim: true,
            notEmpty: {
                errorMessage: 'Địa chỉ là bắt buộc'
            },
            isLength: {
                options: { min: 5, max: 200 },
                errorMessage: 'Địa chỉ phải từ 5 đến 200 ký tự'
            }
        },
        phone_number: {
            isMobilePhone: {
                errorMessage: 'Số điện thoại không hợp lệ'
            },
            trim: true,
            notEmpty: {
                errorMessage: 'Số điện thoại là bắt buộc'
            },
            custom: {
                options: async (value) => {
                    const driver = await databaseService.drivers.findOne({ phone_number: value })
                    if (driver) {
                        throw new ErrorWithStatus({
                            message: 'Số điện thoại đã tồn tại trong hệ thống',
                            status: 400
                        })
                    }
                    return true
                }
            }
        },
        expire_license: {
            isDate: {
                errorMessage: 'Ngày hết hạn bằng lái không hợp lệ'
            },
            trim: true,
            notEmpty: {
                errorMessage: 'Ngày hết hạn bằng lái là bắt buộc'
            }
        },
        experience: {
            isInt: {
                errorMessage: 'Kinh nghiệm phải là số nguyên'
            },
            trim: true,
            notEmpty: {
                errorMessage: 'Kinh nghiệm là bắt buộc'
            }
        }
    })
)
