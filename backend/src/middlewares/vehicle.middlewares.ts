import { checkSchema } from "express-validator";
import { DeleteVehicleController } from "~/controllers/vehicle.controller";
import { validate } from "~/utils/validation";

export const UpdateVehicleValidator = validate(
    checkSchema({
        automaker: {
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
        licensePlates: {
            in: ['body'],
            optional : true,
            isString: true
        },
        frameNumber: {
            in: ['body'],
            optional : true,
          isString: true  
        },
        chassisNumber: {
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
        fuelState: {
            in: ['body'],
            optional : true,
            isNumeric: true
        },
        odometer: {
            in: ['body'],
            optional : true,
            isNumeric: true
        },  
        recentMaintenanceDay: {
            in: ['body'],
            optional : true,
            isDate: true
        },
        
        currentLocation: {
            in: ['body'],
            optional : true,
            isString: true
        }

        
    })
)
export const CreateVehicleValidator = validate(
    checkSchema({
        automaker: {
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
        licensePlates: {
            in: ['body'],
            optional : true,
            isString: true
        },
        frameNumber: {
            in: ['body'],
            optional : true,
          isString: true  
        },
        chassisNumber: {
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
        fuelState: {
            in: ['body'],
            optional : true,
            isNumeric: true
        },
        odometer: {
            in: ['body'],
            optional : true,
            isNumeric: true
        },  
        recentMaintenanceDay: {
            in: ['body'],
            optional : true,
            isDate: true
        },
        
        currentLocation: {
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