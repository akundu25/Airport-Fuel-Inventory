import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
	name: String,
	email: {
		type: String,
		unique: true,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
});

const user = mongoose.model('user', userSchema);

export default user;
