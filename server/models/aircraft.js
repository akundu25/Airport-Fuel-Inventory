import mongoose from 'mongoose';

const aircraftSchema = mongoose.Schema({
	aircraft_no: {
		type: String,
		required: true,
	},
	airline: {
		type: String,
		required: true,
	},
});

const aircraft = mongoose.model('aircraft', aircraftSchema);

export default aircraft;
