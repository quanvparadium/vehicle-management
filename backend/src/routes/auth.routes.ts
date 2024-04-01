import { Router } from 'express'
import { loginValidator } from '~/middlewares/auth.middlewares'
import { loginController } from '~/controllers/auth.controllers'

const authRouter = Router()

authRouter.get('/', (req, res) => {
    return res.json({
        message: 'Đây là trang duyệt authentication'
    })
})

/**
 * Description: Login a user
 * Path: /api/login
 * Method: POST
 * Body: {username: string, password: string}
 */
authRouter.post('/login', loginValidator, loginController)

export default authRouter
