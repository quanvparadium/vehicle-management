import { checkSchema } from "express-validator";
import { validate } from "~/utils/validation";

export const VehicleValidator = validate(
    checkSchema({
        Vehicle_name: {
            isString: true
        },
        Driver_name: {
            isString: true
        },
        type: {
            isString: true
        },
        model: {
            isString: true
        },
        number_plate: {
            isString: true
        },
        frame_number: {
          isString: true  
        },
        chassis_number: {
            isString: true
        },
        state: {
            isString: true
        },
        fuel_state: {
            isNumeric: true
        },
        runned_km: {
            isNumeric: true
        },  
        date_recent_maintenance: {
            isDate: true
        },
        date_next_maintenance: {
            isDate: true
        },
        current_location: {
            isString: true
        }

        
    })
)
export const CreateVehicleValidator = validate(
    checkSchema({
        Vehicle_name: {
            isString: true
        },
        Driver_name: {
            isString: true
        },
        type: {
            isString: true
        },
        model: {
            isString: true
        },
        number_plate: {
            isString: true
        },
        frame_number: {
          isString: true  
        },
        chassis_number: {
            isString: true
        },
        state: {
            isString: true
        },
        fuel_state: {
            isNumeric: true
        },
        runned_km: {
            isNumeric: true
        },  
        date_recent_maintenance: {
            isDate: true
        },
        date_next_maintenance: {
            isDate: true
        },
        current_location: {
            isString: true
        }
    })
)