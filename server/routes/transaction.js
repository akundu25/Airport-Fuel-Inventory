import express from 'express';
import { userAuth } from '../middlewares/user.js';
import {
	performTransactionAction,
	fetchTransactions,
	updateTransaction,
	deleteTransaction,
} from '../controllers/transaction.js';

const router = express.Router();

router.post('/:type', userAuth, performTransactionAction);
router.get('/fetch/:type', userAuth, fetchTransactions);

router.put('/:transactionId', updateTransaction);
router.delete('/delete/:transactionId', deleteTransaction);

export default router;
