import express from 'express';
import { userAuth } from '../middlewares/user.js';
import {
	addAirport,
	fetchAirports,
	fetchAllAirports,
	editAirport,
	fetchTopFiveAirports,
	updateAirport,
	deleteAirport,
} from '../controllers/airport.js';

const router = express.Router();

router.post('/add', userAuth, addAirport);
router.patch('/edit', userAuth, editAirport);
router.get('/', userAuth, fetchAirports);
router.get('/all', userAuth, fetchAllAirports);
router.get('/top-5-airports', userAuth, fetchTopFiveAirports);

router.put('/:airportId', updateAirport);
router.delete('/delete/:airportId', deleteAirport);

export default router;
