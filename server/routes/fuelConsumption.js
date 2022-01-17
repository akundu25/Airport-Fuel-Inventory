import express from 'express';
import { userAuth } from '../middlewares/user.js';
import { fetchFuelConsumption } from '../controllers/fuelConsumption.js';

const router = express.Router();

router.get('/', userAuth, fetchFuelConsumption);

export default router;
