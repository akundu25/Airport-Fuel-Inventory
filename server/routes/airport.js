import express from 'express';
import { userAuth } from '../middlewares/user.js';
import {
	addAirport,
	fetchAirports,
	fetchAllAirports,
	editAirport,
	fetchTopFiveAirports,
} from '../controllers/airport.js';

const router = express.Router();

router.post('/add', userAuth, addAirport);
router.patch('/edit', userAuth, editAirport);
router.get('/', userAuth, fetchAirports);
router.get('/all', userAuth, fetchAllAirports);
router.get('/top-5-airports', userAuth, fetchTopFiveAirports);

export default router;
