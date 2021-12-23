import express from 'express';
import { userAuth } from '../middlewares/user.js';
import {
	fetchFuelConsumption,
	fetchAllFuelConsumption,
} from '../controllers/fuelConsumption.js';

const router = express.Router();

router.get('/', userAuth, fetchFuelConsumption);
router.get('/all', userAuth, fetchAllFuelConsumption);

export default router;
