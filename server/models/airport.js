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
});

const airport = mongoose.model('airport', airportSchema);

export default airport;
