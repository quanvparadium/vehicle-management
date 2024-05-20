import { checkSchema } from 'express-validator'
import { validate } from '~/utils/validation'

export const TripValidator = validate(
    checkSchema({
        _id: {
            in: ['body'],
            isString: false,
            custom: {
                options: (value, { req }) => {
                    if (value) {
                        throw new Error("ID không được phép được cung cấp khi tạo mới trip");
                    }
                    return true;
                }
            },
            errorMessage: "ID không được phép được cung cấp khi tạo mới trip"
        },
        driver_id: {
            in: ['body'],
            isString: true,
            errorMessage: 'Driver ID phải là chuỗi'
        },
        vehicle_id: {
            in: ['body'],
            isString: true,
            errorMessage: 'Vehicle ID phải là chuỗi'
        },
        driver_name: {
            in: ['body'],
            isString: true,
            errorMessage: 'Driver ID phải là chuỗi'
        },
        vehicle_name: {
            in: ['body'],
            isString: true,
            errorMessage: 'Vehicle ID phải là chuỗi'
        },
        price: {
            in: ['body'],
            isFloat: {
                options: { min: 0 },
                errorMessage: 'Giá (price) phải là số dương'
            }
        },
        status: {
            in: ['body'],
            isString: true,
            trim: true, //Bỏ khoảng trắng đầu và cuối chuỗi
            errorMessage: 'Trạng thái (status) phải là chuỗi'
        },
        starting_point: {
            in: ['body'],
            isString: true,
            trim: true,
            errorMessage: 'Điểm bắt đầu (starting point) phải là chuỗi'
        },
        destination: {
            in: ['body'],
            isString: true,
            trim: true,
            errorMessage: 'Điểm đến (destination) phải là chuỗi'
        },
        pathway: {
            in: ['body'],
            isString: true,
            trim: true,
            errorMessage: 'Đường đi (pathway) phải là chuỗi'
        },
        distance: {
            in: ['body'],
            isFloat: {
                options: { min: 0 },
                errorMessage: 'Khoảng cách (distance) phải là số dương'
            }
        },
        date_of_departure: {
            in: ['body'],
            isISO8601: true,
            errorMessage: 'Ngày khởi hành (date of departure) phải có định dạng ISO 8601'
        },
        date_of_arrival: {
            in: ['body'],
            isISO8601: true,
            errorMessage: 'Ngày đến (date of arrival) phải có định dạng ISO 8601'
        },
        expected_time: {
            in: ['body'],
            isFloat: {
                options: { min: 0 },
                errorMessage: 'Thời gian dự kiến (expected time) phải là số dương'
            }
        }
    })
);

export const TripDeleteValidator = validate(
    checkSchema({
        _id: {
            in: ['body'],
            isString: true,
            errorMessage: "_id phải là chuỗi"
        }
    })
)

export const TripUpdateValidator = validate(
    checkSchema({
        _id: {
            in: ['body'],
            isString: true,
            optional: true,
            errorMessage: "_id phải là chuỗi"
        },
        driver_id: {
            in: ['body'],
            isString: true,
            optional: true,
            errorMessage: 'Driver ID phải là chuỗi'
        },
        vehicle_id: {
            in: ['body'],
            isString: true,
            optional: true,
            errorMessage: 'Vehicle ID phải là chuỗi'
        },
        driver_name: {
            in: ['body'],
            isString: true,
            optional: true,
            errorMessage: 'Driver ID phải là chuỗi'
        },
        vehicle_name: {
            in: ['body'],
            isString: true,
            optional: true,
            errorMessage: 'Vehicle ID phải là chuỗi'
        },
        price: {
            in: ['body'],
            optional: true,
            isFloat: {
                options: { min: 0 },
                errorMessage: 'Giá (price) phải là số dương'
            },
            
        },
        status: {
            in: ['body'],
            isString: true,
            trim: true,
            optional: true,
            errorMessage: 'Trạng thái (status) phải là chuỗi'
        },
        starting_point: {
            in: ['body'],
            isString: true,
            trim: true,
            optional: true,
            errorMessage: 'Điểm bắt đầu (starting point) phải là chuỗi'
        },
        destination: {
            in: ['body'],
            isString: true,
            trim: true,
            optional: true,
            errorMessage: 'Điểm đến (destination) phải là chuỗi'
        },
        pathway: {
            in: ['body'],
            isString: true,
            trim: true,
            optional: true,
            errorMessage: 'Đường đi (pathway) phải là chuỗi'
        },
        distance: {
            in: ['body'],
            isFloat: {
                options: { min: 0 },
                errorMessage: 'Khoảng cách (distance) phải là số dương'
            },
            optional: true,
        },
        date_of_departure: {
            in: ['body'],
            isISO8601: true,
            optional: true,
            errorMessage: 'Ngày khởi hành (date of departure) phải có định dạng ISO 8601'
        },
        date_of_arrival: {
            in: ['body'],
            isISO8601: true,
            optional: true,
            errorMessage: 'Ngày đến (date of arrival) phải có định dạng ISO 8601'
        },
        expected_time: {
            in: ['body'],
            isFloat:{
                options: { min: 0 },
                errorMessage: 'Thời gian dự kiến (expected time) phải là số dương'
            },
            optional: true,
        }

    })
)