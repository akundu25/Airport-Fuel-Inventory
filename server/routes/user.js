import express from 'express';
import { body } from 'express-validator';
import { loginUser, signupUser } from '../controllers/user.js';

const router = express.Router();

router.post('/login', loginUser);
router.post(
	'/signup',
	body('email').isEmail().withMessage('Enter a valid email id'),
	body('password')
		.isLength({ min: 8, max: 20 })
		.withMessage(
			'The password should be atleast 8 and atmost 20 characters long'
		),
	signupUser
);

export default router;
