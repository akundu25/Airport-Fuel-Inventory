import jwt from 'jsonwebtoken';
import user from '../models/user.js';

export const userAuth = async (req, res, next) => {
	try {
		let token;
		if (
			req.headers.authorization &&
			req.headers.authorization.startsWith('Bearer')
		) {
			token = req.headers.authorization.split(' ')[1];
		}

		if (!token)
			return res
				.status(401)
				.json({ message: 'Not authorized to access this route' });

		const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

		const oldUser = await user.findOne({ email: decodedToken?.email });

		if (!oldUser)
			return res.status(404).json({ message: 'No user found with this email' });

		req.email = decodedToken?.email;

		next();
	} catch (error) {
		console.log(error);
		res.status(500).json({ errors: [{ msg: error.message }] });
	}
};
