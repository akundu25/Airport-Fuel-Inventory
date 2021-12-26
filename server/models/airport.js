import mongoose from 'mongoose';

const airportSchema = mongoose.Schema({
	airport_name: {
		type: String,
		required: true,
	},
	fuel_available: {
		type: Number,
		required: true,
	},
	fuel_capacity: {
		type: Number,
		required: true,
	},
	no_of_transactions: {
		type: Number,
		default: 0,
	},
});

const airport = mongoose.model('airport', airportSchema);

export default airport;
