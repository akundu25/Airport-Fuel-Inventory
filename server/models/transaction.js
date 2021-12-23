import mongoose from 'mongoose';

const transactionSchema = mongoose.Schema({
	transaction_date_time: {
		type: String,
		required: true,
	},
	transaction_type: {
		type: String,
		required: true,
	},
	airport_id: {
		type: Object,
		required: true,
	},
	airport_name: {
		type: String,
		required: true,
	},
	aircraft_id: Object,
	aircraft_name: String,
	quantity: {
		type: Number,
		required: true,
	},
	transaction_id_parent: Object,
});

const transaction = mongoose.model('transaction', transactionSchema);

export default transaction;
