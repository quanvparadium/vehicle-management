import { JwtPayload } from 'jsonwebtoken'
import { TokenType } from '~/constants/enum'

export interface RegisterReqBody {
    fullname: string
    username: string
    email: string
    password: string
    confirm_password: string
    date_of_birth: Date
    role: string
}

export interface LogoutReqBody {
    refresh_token: string
}

export interface TokenPayload extends JwtPayload {
    user_id: string
    token_type: TokenType
}