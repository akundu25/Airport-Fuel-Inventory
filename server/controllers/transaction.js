import airport from '../models/airport.js';
import transaction from '../models/transaction.js';

const fetchingTransactions = async (page, limit, res) => {
	try {
		const startIndex = (page - 1) * limit;
		const endIndex = page * limit;

		const transactionCount = await transaction.countDocuments();

		const results = {};

		if (startIndex > 0) {
			results.prev = {
				page: page - 1,
				limit,
			};
		}

		if (endIndex < transactionCount) {
			results.next = {
				page: page + 1,
				limit,
			};
		}

		results.transactions = await transaction
			.find()
			.skip(startIndex)
			.limit(limit)
			.sort({ transaction_date_time: -1 });

		return res.status(200).json(results);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: error.message });
	}
};

export const addTransaction = async (req, res) => {
	try {
		const newTransaction = req.body;
		const page = parseInt(req.query.page);
		const limit = parseInt(req.query.limit);

		const { transaction_type, airport_id, quantity } = newTransaction;

		const { fuel_available, fuel_capacity } = await airport.findById(
			airport_id,
			{
				fuel_available: 1,
				fuel_capacity: 1,
			}
		);

		const int_fuel_available = parseInt(fuel_available);
		const int_fuel_capacity = parseInt(fuel_capacity);
		const int_quantity = parseInt(quantity);
		let newFuelAvailable;

		if (transaction_type === 'OUT') {
			if (int_fuel_available < int_quantity)
				return res
					.status(400)
					.json({ message: 'This much fuel is not available at the airport' });
			else newFuelAvailable = int_fuel_available - int_quantity;
		} else {
			if (int_fuel_available + int_quantity > int_fuel_capacity)
				return res.status(400).json({
					message: 'More fuel available than capacity of the airport',
				});
			else newFuelAvailable = int_fuel_available + int_quantity;
		}

		await airport.findByIdAndUpdate(airport_id, {
			$set: { fuel_available: newFuelAvailable },
		});

		await transaction.create(newTransaction);

		return fetchingTransactions(page, limit, res);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error.message });
	}
};

export const fetchTransactions = async (req, res) => {
	const page = parseInt(req.query.page);
	const limit = parseInt(req.query.limit);

	return fetchingTransactions(page, limit, res);
};

export const fetchAllTransactions = async (req, res) => {
	try {
		const allTransactions = await transaction.find();
		res.status(200).json(allTransactions);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error.message });
	}
};

export const reverseTransaction = async (req, res) => {
	try {
		const page = parseInt(req.query.page);
		const limit = parseInt(req.query.limit);
		const {
			_id,
			transaction_type,
			quantity,
			airport_id,
			airport_name,
			aircraft_id,
			aircraft_name,
		} = req.body;
		let newFuelAvailable;

		const { fuel_available, fuel_capacity } = await airport.findById(
			airport_id,
			{
				fuel_available: 1,
				fuel_capacity: 1,
			}
		);

		if (transaction_type === 'IN') {
			if (parseInt(quantity) > parseInt(fuel_available))
				return res.status(400).json({
					message:
						'Transaction can not be reversed. Not enough fuel available.',
				});
			else newFuelAvailable = parseInt(fuel_available) - parseInt(quantity);
		} else {
			if (
				parseInt(fuel_available) + parseInt(quantity) >
				parseInt(fuel_capacity)
			)
				return res.status(400).json({
					message:
						'Transaction can not be reversed. More fuel than capacity at the airport.',
				});
			else newFuelAvailable = parseInt(fuel_available) + parseInt(quantity);
		}

		await airport.findByIdAndUpdate(airport_id, {
			$set: { fuel_available: newFuelAvailable },
		});
		await transaction.create({
			transaction_date_time: new Date(),
			transaction_type: 'Reverse',
			airport_id,
			airport_name,
			aircraft_id,
			aircraft_name,
			quantity,
			transaction_id_parent: _id,
		});

		await transaction.findByIdAndUpdate(_id, {
			$set: { transaction_type: transaction_type + '(Reversed)' },
		});
		return fetchingTransactions(page, limit, res);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error.message });
	}
};
