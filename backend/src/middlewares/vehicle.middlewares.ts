import { checkSchema } from "express-validator";
import { DeleteVehicleController } from "~/controllers/vehicle.controller";
import { validate } from "~/utils/validation";

export const UpdateVehicleValidator = validate(
    checkSchema({
        Vehicle_name: {
            in: ['body'],
            optional : true,
            isString: true
        },
        Driver_name: {
            in: ['body'],
            optional : true,
            isString: true
        },
        type: {
            in: ['body'],
            optional : true,
            isString: true
        },
        model: {
            in: ['body'],
            optional : true,
            isString: true
        },
        number_plate: {
            in: ['body'],
            optional : true,
            isString: true
        },
        frame_number: {
            in: ['body'],
            optional : true,
          isString: true  
        },
        chassis_number: {
            in: ['body'],
            optional : true,
            isString: true
        },
        state: {
            in: ['body'],
            optional : true,
            isString: true
        },
        on_trip: {
            in: ['body'],
            optional : true,
            isBoolean: true
        },
        fuel_state: {
            in: ['body'],
            optional : true,
            isNumeric: true
        },
        runned_km: {
            in: ['body'],
            optional : true,
            isNumeric: true
        },  
        date_recent_maintenance: {
            in: ['body'],
            optional : true,
            isDate: true
        },
        date_next_maintenance: {
            in: ['body'],
            optional : true,
            isDate: true
        },
        current_location: {
            in: ['body'],
            optional : true,
            isString: true
        }

        
    })
)
export const CreateVehicleValidator = validate(
    checkSchema({
        Vehicle_name: {
            in: ['body'],
            optional : true,
            isString: true
        },
        Driver_name: {
            in: ['body'],
            optional : true,
            isString: true
        },
        type: {
            in: ['body'],
            optional : true,
            isString: true
        },
        model: {
            in: ['body'],
            optional : true,
            isString: true
        },
        number_plate: {
            in: ['body'],
            optional : true,
            isString: true
        },
        frame_number: {
            in: ['body'],
            optional : true,
          isString: true  
        },
        chassis_number: {
            in: ['body'],
            optional : true,
            isString: true
        },
        state: {
            in: ['body'],
            optional : true,
            isString: true
        },
        on_trip: {
            in: ['body'],
            optional : true,
            isBoolean: true
        },
        fuel_state: {
            in: ['body'],
            optional : true,
            isNumeric: true
        },
        runned_km: {
            in: ['body'],
            optional : true,
            isNumeric: true
        },  
        date_recent_maintenance: {
            in: ['body'],
            optional : true,
            isDate: true
        },
        date_next_maintenance: {
            in: ['body'],
            optional : true,
            isDate: true
        },
        current_location: {
            in: ['body'],
            optional : true,
            isString: true
        }


        
    })
)

export const DeleteVehicleValidator = validate(
    checkSchema({
        _id: {
            in: ['body'],
            isString: true
        }
    })
)