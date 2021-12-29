import airport from '../models/airport.js';
import transaction from '../models/transaction.js';

export const fetchFuelConsumption = async (req, res) => {
	try {
		const limit = parseInt(req.query.limit);
		const page = parseInt(req.query.page);

		const startIndex = (page - 1) * limit;
		const endIndex = page * limit;

		const airportCount = await airport.countDocuments();
		const airports = {};
		const transactions = [];

		if (endIndex < airportCount) {
			airports.next = {
				page: page + 1,
				limit,
			};
		}

		airports.result = await airport
			.find()
			.limit(limit)
			.skip(startIndex)
			.sort({ airport_name: 1 });

		let transactionsData;
		let airport_id;

		for (let { _id } of airports.result) {
			airport_id = _id.toString();
			transactionsData = await transaction.find({ airport_id });
			transactions.splice(0, 0, ...transactionsData);
		}

		res.status(200).json({ airports, transactions });
	} catch (error) {
		console.log(error);
		res.status(500).json({ errors: [{ msg: error.message }] });
	}
};

export const fetchAllFuelConsumption = async (req, res) => {
	try {
		const allAirports = await airport.find();
		const allTransactions = await transaction.find();

		res
			.status(200)
			.json({ airports: allAirports, transactions: allTransactions });
	} catch (error) {
		console.log(error);
		res.status(500).json({ errors: [{ msg: error.message }] });
	}
};
