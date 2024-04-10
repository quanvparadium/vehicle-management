import jwt, { JwtPayload, Secret } from 'jsonwebtoken'
import { TokenPayload } from '~/models/requests/User.requests'

export const signToken = ({
    payload,
    privateKey,
    options = {
        algorithm: 'HS256'
    }
}: {
    payload: any
    privateKey: Secret
    options?: jwt.SignOptions
}) => {
    //   jwt.sign(payload, privateKey, options, (error, token))
    return new Promise<string>((resolve, reject) => {
        jwt.sign(payload, privateKey, options, (error, token) => {
            if (error) {
                throw reject(error)
            }
            resolve(token as string)
        })
    })
}

export const verifyToken = ({ token, secretOrPublicKey }: { token: string; secretOrPublicKey: Secret }) => {
    return new Promise<TokenPayload>((resolve, reject) => {
        jwt.verify(token, secretOrPublicKey, (error, decoded) => {
            if (error) {
                throw reject(error)
            }
            resolve(decoded as TokenPayload)
        })
    })
}