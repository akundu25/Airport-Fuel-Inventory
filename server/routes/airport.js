import express from 'express';
import { userAuth } from '../middlewares/user.js';
import {
	addAirport,
	fetchAirports,
	fetchAllAirports,
	editAirport,
} from '../controllers/airport.js';

const router = express.Router();

router.post('/add', userAuth, addAirport);
router.patch('/edit', userAuth, editAirport);
router.get('/', userAuth, fetchAirports);
router.get('/all', userAuth, fetchAllAirports);

export default router;
