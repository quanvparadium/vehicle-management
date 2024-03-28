import { Router } from 'express'

const authRouter = Router()

authRouter.get('/', (req, res) => {
    return res.json({
        message: 'Đây là trang duyệt authentication'  
    })
})

export default authRouter
