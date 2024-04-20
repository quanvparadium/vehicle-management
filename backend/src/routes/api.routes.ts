import { Router } from 'express'

const apiRouter = Router()

apiRouter.get('/', (req, res) => {
    return res.json({
        message: 'Đây là trang lấy API'
    })
})

apiRouter.get('/trip', (req, res) => {
    return res.json([]);
})

export default apiRouter
