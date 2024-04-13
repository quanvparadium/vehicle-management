import { Router } from 'express'

const apiRouter = Router()

apiRouter.get('/', (req, res) => {
    return res.json({
        message: 'Đây là trang lấy API'
    })
})

export default apiRouter
