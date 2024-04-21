import { Router } from 'express'
import { accessTokenValidator } from '~/middlewares/auth.middlewares'
import { TripValidator } from '~/middlewares/trips.middlewares'
import { TripUpdateValidator } from '~/middlewares/trips.middlewares'
import { getAllTripController, createTripController, updateTripController, deleteTripController, getTripController } from '~/controllers/trip.controllers'

const tripRouter = Router();
tripRouter.post('/AddTrip',accessTokenValidator, TripValidator, createTripController)
tripRouter.get('/ListTrip', accessTokenValidator, getAllTripController)
tripRouter.get('/', accessTokenValidator, getTripController)
tripRouter.put('/UpdateTrip', accessTokenValidator,TripUpdateValidator, updateTripController)
tripRouter.delete('/DeleteTrip', accessTokenValidator, deleteTripController)
export default tripRouter