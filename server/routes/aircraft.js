import express from 'express';
import { userAuth } from '../middlewares/user.js';
import {
	addAircraft,
	editAircraft,
	fetchAircrafts,
	fetchAllAircrafts,
	fetchTopFiveAirline,
} from '../controllers/aircraft.js';

const router = express.Router();

router.post('/add', userAuth, addAircraft);
router.patch('/edit', userAuth, editAircraft);
router.get('/', userAuth, fetchAircrafts);
router.get('/all', userAuth, fetchAllAircrafts);
router.get('/top-5-airline', userAuth, fetchTopFiveAirline);

export default router;
