import HTTPSTATUS from '~/constants/httpStatus'
import { USERS_MESSAGES } from '~/constants/messages'

type ErrorsType = Record<
    string,
    {
        msg: string
        [key: string]: any
    }
>

export class ErrorWithStatus {
    message: string
    status: number
    constructor({ message, status }: { message: string; status: number }) {
        this.message = message
        this.status = status
    }
}

/**
 * Dùng để xử lý error trả về với status 422 - Unprocessable Entity
 */
export class EntityError extends ErrorWithStatus {
    errors: ErrorsType
    constructor({ message = USERS_MESSAGES.VALIDATION_ERROR, errors }: { message?: string; errors: ErrorsType }) {
        super({ message: message, status: HTTPSTATUS.UNPROCESSABLE_ENTITY })
        this.errors = errors
    }
}
