import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import user from '../models/user.js';
import { validationResult } from 'express-validator';

export const signupUser = async (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty())
		return res.status(400).json({ errors: errors.array() });
	try {
		const { name, email, password, confirmPassword } = req.body;

		const existingUser = await user.findOne({ email });

		if (existingUser)
			return res.status(400).json({ errors: [{ msg: 'User already exists' }] });

		if (password !== confirmPassword)
			return res
				.status(400)
				.json({ errors: [{ msg: 'The password do not match' }] });

		const hashedPassword = await bcrypt.hash(password, 12);

		const newUser = { name, email, password: hashedPassword };

		await user.create(newUser);
		res.status(201).json({ message: 'User created successfully' });
	} catch (error) {
		console.log(error);
		res.status(500).json({ errors: [{ msg: error.message }] });
	}
};

export const loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;

		const existingUser = await user.findOne({ email });

		if (!existingUser)
			return res.status(404).json({ errors: [{ msg: 'User not found' }] });

		const isPasswordCorrect = await bcrypt.compare(
			password,
			existingUser.password
		);

		if (!isPasswordCorrect)
			return res.status(400).json({ errors: [{ msg: 'Incorrect password' }] });

		const token = jwt.sign(
			{ email, id: existingUser._id },
			process.env.JWT_SECRET,
			{ expiresIn: process.env.JWT_EXPIRE }
		);

		const clientUser = { name: existingUser.name, email };

		res.status(200).json({ clientUser, token });
	} catch (error) {
		res.status(500).json({ errors: [{ msg: error.message }] });
		console.log(error);
	}
};

export const getUsers = async (req, res) => {
	try {
		const users = await user.find();
		res.status(200).json(users);
	} catch (error) {
		res.status(500).json({ errors: [{ msg: error.message }] });
		console.log(error);
	}
};

export const editUser = async (req, res) => {
	try {
		const { id } = req.params;
		const updatedUser = await user.findByIdAndUpdate(id, req.body, {
			new: true,
		});
		res.status(201).json(updatedUser);
	} catch (error) {
		res.status(500).json({ errors: [{ msg: error.message }] });
		console.log(error);
	}
};

export const deleteUser = async (req, res) => {
	try {
		const { id } = req.params;
		await user.findByIdAndDelete(id);
		res.status(200).json({ message: 'the user has been deleted' });
	} catch (error) {
		res.status(500).json({ errors: [{ msg: error.message }] });
		console.log(error);
	}
};
