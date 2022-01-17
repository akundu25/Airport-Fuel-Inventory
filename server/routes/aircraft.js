import express from 'express';
import { userAuth } from '../middlewares/user.js';
import {
	addAircraft,
	editAircraft,
	fetchAircrafts,
	updateAircraft,
	deleteAircraft,
} from '../controllers/aircraft.js';

const router = express.Router();

router.post('/add', userAuth, addAircraft);
router.patch('/edit', userAuth, editAircraft);
router.get('/:type', userAuth, fetchAircrafts);

router.put('/:aircraftId', updateAircraft);
router.delete('/delete/:aircraftId', deleteAircraft);

export default router;
