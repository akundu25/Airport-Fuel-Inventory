import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import user from '../models/user.js';

export const signupUser = async (req, res) => {
	try {
		const { name, email, password, confirmPassword } = req.body;

		const existingUser = await user.findOne({ email });

		if (existingUser)
			return res.status(400).json({ message: 'User already exists' });

		if (password !== confirmPassword)
			return res.status(400).json({ message: 'passwords do not match' });

		const hashedPassword = await bcrypt.hash(password, 12);

		const newUser = { name, email, password: hashedPassword };

		const newlyCreatedUser = await user.create(newUser);

		const token = jwt.sign(
			{ email, id: newlyCreatedUser._id },
			process.env.JWT_SECRET,
			{ expiresIn: process.env.JWT_EXPIRE }
		);

		const clientUser = { email, name };

		res.status(200).json({ clientUser, token });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error.message });
	}
};

export const loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;

		const existingUser = await user.findOne({ email });

		if (!existingUser)
			return res.status(404).json({ message: 'User not found' });

		const isPasswordCorrect = await bcrypt.compare(
			password,
			existingUser.password
		);

		if (!isPasswordCorrect)
			return res.status(400).json({ message: 'Incorrect password' });

		const token = jwt.sign(
			{ email, id: existingUser._id },
			process.env.JWT_SECRET,
			{ expiresIn: process.env.JWT_EXPIRE }
		);

		const clientUser = { name: existingUser.name, email };

		res.status(200).json({ clientUser, token });
	} catch (error) {
		res.status(500).json({ message: error.message });
		console.log(error);
	}
};
