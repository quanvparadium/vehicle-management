import { createHash } from 'crypto'

export function sha256(content) {
    return createHash('sha256').update(content).digest('hex')
}

export function hashPassword(password: string, algorithm: (any) => string = sha256) {
    return algorithm(password)
}
