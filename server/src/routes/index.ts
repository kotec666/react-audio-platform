import express from 'express'
const router = express.Router()


import trackRouter from './trackRouter'
import favoriteTrackRouter from './favoriteTrackRouter'
import recentlyTrackRouter from './recentlyTrackRouter'
import favoriteRouter from './favoriteRouter'
import recentlyRouter from './recentlyRouter'
import genreRouter from './genreRouter'
import applicationRouter from './applicationRouter'
import albumRouter from './albumRouter'
import userRouter from './userRouter'



router.use('/track', trackRouter)
router.use('/favoriteTrack', favoriteTrackRouter)
router.use('/recentlyTrack', recentlyTrackRouter)
router.use('/favorite', favoriteRouter)
router.use('/recently', recentlyRouter)
router.use('/genre', genreRouter)
router.use('/album', albumRouter)
router.use('/application', applicationRouter)
router.use('/user', userRouter)



export default router
