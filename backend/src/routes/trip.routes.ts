import { Router } from 'express'
import { accessTokenValidator } from '~/middlewares/auth.middlewares'
import { TripValidator } from '~/middlewares/trips.middlewares'
import { TripDeleteValidator } from '~/middlewares/trips.middlewares'
import { TripUpdateValidator } from '~/middlewares/trips.middlewares'
import { getAllTripController, createTripController, updateTripController, deleteTripController } from '~/controllers/trip.controllers'

const tripRouter = Router();
tripRouter.post('/',accessTokenValidator, TripValidator, createTripController)
tripRouter.get('/', accessTokenValidator, getAllTripController)
tripRouter.put('/', accessTokenValidator,TripUpdateValidator, updateTripController)
tripRouter.delete('/', accessTokenValidator,TripDeleteValidator, deleteTripController)
export default tripRouter