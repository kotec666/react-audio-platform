import express from 'express'
const router = express.Router()


// import typeRouter from './typeRouter'
import userRouter from './userRouter'



// router.use('/type', typeRouter)
router.use('/user', userRouter)



export default router
