import express from 'express';
import { body } from 'express-validator';
import {
	loginUser,
	signupUser,
	getUsers,
	editUser,
	deleteUser,
} from '../controllers/user.js';

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

router.get('/', getUsers);
router.put('/:id', editUser);
router.delete('/delete/:id', deleteUser);

export default router;
