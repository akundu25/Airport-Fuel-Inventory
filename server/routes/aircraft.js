import express from 'express';
import { userAuth } from '../middlewares/user.js';
import {
	addAircraft,
	editAircraft,
	fetchAircrafts,
	fetchAllAircrafts,
} from '../controllers/aircraft.js';

const router = express.Router();

router.post('/add', userAuth, addAircraft);
router.patch('/edit', userAuth, editAircraft);
router.get('/', userAuth, fetchAircrafts);
router.get('/all', userAuth, fetchAllAircrafts);

export default router;
