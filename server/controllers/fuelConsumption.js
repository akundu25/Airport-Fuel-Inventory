import airport from '../models/airport.js';
import transaction from '../models/transaction.js';

export const fetchFuelConsumption = async (req, res) => {
	try {
		const transactions = [];

		const airports = await airport
			.find({ no_of_transactions: { $gt: 0 } })
			.sort({ airport_name: 1 });

		const nonTransactionAirports = await airport
			.find({ no_of_transactions: 0 })
			.sort({ airport_name: 1 });

		let transactionsData;
		let airport_id;

		for (let { _id } of airports) {
			airport_id = _id.toString();
			transactionsData = await transaction.find({ airport_id });
			transactions.splice(0, 0, ...transactionsData);
		}

		res.status(200).json({ airports, transactions, nonTransactionAirports });
	} catch (error) {
		console.log(error);
		res.status(500).json({ errors: [{ msg: error.message }] });
	}
};
