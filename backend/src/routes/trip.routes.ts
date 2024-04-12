import { Router } from 'express'
import { accessTokenValidator } from '~/middlewares/auth.middlewares'
import { TripValidator } from '~/middlewares/trips.middlewares'
import { getAllTripController, createTripController, updateTripController, deleteTripController } from '~/controllers/trip.controllers'

const tripRouter = Router();
tripRouter.post('/AddTrip',accessTokenValidator, TripValidator, createTripController)
tripRouter.get('/ListTrip', accessTokenValidator, getAllTripController)
tripRouter.put('/UpdateTrip', accessTokenValidator, updateTripController)
tripRouter.delete('/DeleteTrip', accessTokenValidator, deleteTripController)
export default tripRouter