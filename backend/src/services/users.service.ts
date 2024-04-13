import databaseService from '~/services/database.service'
import { TokenType } from '~/constants/enum'
import { signToken, verifyToken } from '~/utils/jwt'
import RefreshToken from '~/models/schemas/RefreshToken.schema'
import { ObjectId } from 'mongodb'

class UsersService {
    private signAccessToken(user_id: string) {
        return signToken({
            payload: {
                user_id,
                tokenType: TokenType.AccessToken
            },
            privateKey: process.env.JWT_SECRET_ACCESS_TOKEN as string,
            options: {
                expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN
            }
        })
    }

    private signRefreshToken(user_id: string) {
        return signToken({
            payload: {
                user_id,
                tokenType: TokenType.RefreshToken
            },
            privateKey: process.env.JWT_SECRET_REFRESH_TOKEN as string,
            options: {
                expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN
            }
        })
    }

    private signEmailVerifyToken(user_id: string) {
        return signToken({
            payload: {
                user_id,
                tokenType: TokenType.EmailVerifyToken
            },
            privateKey: process.env.JWT_SECRET_EMAIL_VERIFY_TOKEN as string,
            options: {
                expiresIn: process.env.EMAIL_VERIFY_TOKEN_EXPIRES_IN
            }
        })
    }

    private signAccessandRefreshToken(user_id: string) {
        return Promise.all([this.signAccessToken(user_id), this.signRefreshToken(user_id)])
    }

    async login(user_id: string) {
        const [access_token, refresh_token] = await this.signAccessandRefreshToken(user_id)
        await databaseService.refreshTokens.insertOne(
            new RefreshToken({
                user_id: new ObjectId(user_id),
                token: refresh_token
            })
        )
        return {
            access_token,
            refresh_token
        }
    }
}

const usersService = new UsersService()
export default usersService
