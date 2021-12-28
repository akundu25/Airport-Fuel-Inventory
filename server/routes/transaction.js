import express from 'express';
import { userAuth } from '../middlewares/user.js';
import {
	addTransaction,
	fetchTransactions,
	fetchAllTransactions,
	reverseTransaction,
} from '../controllers/transaction.js';

const router = express.Router();

router.post('/add', userAuth, addTransaction);
router.get('/', userAuth, fetchTransactions);
router.get('/all', userAuth, fetchAllTransactions);
router.post('/reverse', userAuth, reverseTransaction);

export default router;
