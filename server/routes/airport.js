import express from 'express';
import { userAuth } from '../middlewares/user.js';
import {
	addAirport,
	fetchAirports,
	editAirport,
	updateAirport,
	deleteAirport,
} from '../controllers/airport.js';

const router = express.Router();

router.post('/add', userAuth, addAirport);
router.patch('/edit', userAuth, editAirport);
router.get('/:type', userAuth, fetchAirports);

router.put('/:airportId', updateAirport);
router.delete('/delete/:airportId', deleteAirport);

export default router;
