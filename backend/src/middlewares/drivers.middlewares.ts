import { checkSchema } from 'express-validator'
import { validate } from '~/utils/validation'

export const DriverValidator = validate(
    checkSchema({
        fullname: {
            in: ['body'],
            isString: {
                errorMessage: 'Họ và tên phải là chuỗi'
            },
            trim: true,
            notEmpty: {
                errorMessage: 'Họ và tên là bắt buộc'
            },
            isLength: {
                options: { min: 3, max: 50 },
                errorMessage: 'Họ và tên phải từ 3 đến 50 ký tự'
            }
        },
        email: {
            in: ['body'],
            isEmail: {
                errorMessage: 'Email không hợp lệ'
            },
            notEmpty: {
                errorMessage: 'Email là bắt buộc'
            }
        },
        date_of_birth: {
            in: ['body'],
            isDate: {
                errorMessage: 'Ngày sinh không hợp lệ'
            },
            notEmpty: {
                errorMessage: 'Ngày sinh là bắt buộc'
            }
        },
        identification: {
            in: ['body'],
            isString: {
                errorMessage: 'Số căn cước phải là chuỗi'
            },
            trim: true,
            notEmpty: {
                errorMessage: 'Số căn cước là bắt buộc'
            }
        },
        address: {
            in: ['body'],
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
            in: ['body'],
            isMobilePhone: {
                errorMessage: 'Số điện thoại không hợp lệ'
            },
            notEmpty: {
                errorMessage: 'Số điện thoại là bắt buộc'
            }
        },
        expire_license: {
            in: ['body'],
            isDate: {
                errorMessage: 'Ngày hết hạn bằng lái không hợp lệ'
            },
            notEmpty: {
                errorMessage: 'Ngày hết hạn bằng lái là bắt buộc'
            }
        },
        experience: {
            in: ['body'],
            isInt: {
                errorMessage: 'Kinh nghiệm phải là số nguyên'
            },
            notEmpty: {
                errorMessage: 'Kinh nghiệm là bắt buộc'
            }
        }
    })
)
