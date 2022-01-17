import airport from '../models/airport.js';
import transaction from '../models/transaction.js';
import moment from 'moment';

const fetchingTransactions = async (page, limit, res) => {
	try {
		const startIndex = (page - 1) * limit;
		const endIndex = page * limit;

		const transactionCount = await transaction.countDocuments();
		const pageCount = Math.ceil(transactionCount / limit);

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

		results.pageCount = pageCount;

		return res.status(200).json(results);
	} catch (error) {
		console.log(error);
		res.status(500).json({ errors: [{ msg: error.message }] });
	}
};

const addTransaction = async (page, limit, transactionToBeAdded, res) => {
	try {
		const { transaction_type, airport_id, quantity } = transactionToBeAdded;

		const { fuel_available, fuel_capacity, no_of_transactions } =
			await airport.findById(airport_id, {
				fuel_available: 1,
				fuel_capacity: 1,
				no_of_transactions: 1,
			});

		const int_no_of_transactions = parseInt(no_of_transactions);
		const int_fuel_available = parseInt(fuel_available);
		const int_fuel_capacity = parseInt(fuel_capacity);
		const int_quantity = parseInt(quantity);
		let newFuelAvailable;

		if (transaction_type === 'OUT') {
			if (int_fuel_available < int_quantity)
				return res
					.status(400)
					.json({ errors: [{ msg: 'Not enough fuel available' }] });
			else newFuelAvailable = int_fuel_available - int_quantity;
		} else {
			if (int_fuel_available + int_quantity > int_fuel_capacity)
				return res.status(400).json({
					errors: [{ msg: 'Error: Fuel available > fuel capacity' }],
				});
			else newFuelAvailable = int_fuel_available + int_quantity;
		}

		await airport.findByIdAndUpdate(airport_id, {
			$set: {
				fuel_available: newFuelAvailable,
				no_of_transactions: int_no_of_transactions + 1,
			},
		});

		await transaction.create(transactionToBeAdded);

		return fetchingTransactions(page, limit, res);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ errors: [{ msg: error.message }] });
	}
};

export const fetchTransactions = (req, res) => {
	const { type } = req.params;
	if (type === 'per-page') {
		const page = parseInt(req.query.page);
		const limit = parseInt(req.query.limit);

		return fetchingTransactions(page, limit, res);
	} else if (type === 'all') {
		return fetchAllTransactions(res);
	}
};

const fetchAllTransactions = async (res) => {
	try {
		const allTransactions = await transaction.find();
		return res.status(200).json(allTransactions);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ errors: [{ msg: error.message }] });
	}
};

const reverseTransaction = async (
	page,
	limit,
	transactionToBeReversed,
	res
) => {
	try {
		const {
			_id,
			transaction_type,
			quantity,
			airport_id,
			airport_name,
			aircraft_id,
			aircraft_name,
		} = transactionToBeReversed;
		let newFuelAvailable;

		const { fuel_available, fuel_capacity, no_of_transactions } =
			await airport.findById(airport_id, {
				fuel_available: 1,
				fuel_capacity: 1,
				no_of_transactions: 1,
			});

		if (transaction_type === 'IN') {
			if (parseInt(quantity) > parseInt(fuel_available))
				return res.status(400).json({
					errors: [{ msg: 'Error: Not enough fuel available' }],
				});
			else newFuelAvailable = parseInt(fuel_available) - parseInt(quantity);
		} else {
			if (
				parseInt(fuel_available) + parseInt(quantity) >
				parseInt(fuel_capacity)
			)
				return res.status(400).json({
					errors: [{ msg: 'Error: Fuel available > fuel capacity' }],
				});
			else newFuelAvailable = parseInt(fuel_available) + parseInt(quantity);
		}

		await airport.findByIdAndUpdate(airport_id, {
			$set: {
				fuel_available: newFuelAvailable,
				no_of_transactions: parseInt(no_of_transactions) - 1,
			},
		});
		await transaction.create({
			transaction_date_time: moment().format('LLL'),
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
		return res.status(500).json({ errors: [{ msg: error.message }] });
	}
};

export const performTransactionAction = (req, res) => {
	const { type } = req.params;
	const page = parseInt(req.query.page);
	const limit = parseInt(req.query.limit);
	if (type === 'reverse') {
		const transactionToBeReversed = req.body;
		return reverseTransaction(page, limit, transactionToBeReversed, res);
	} else if (type === 'add') {
		const transactionToBeAdded = req.body;
		return addTransaction(page, limit, transactionToBeAdded, res);
	}
};

export const updateTransaction = async (req, res) => {
	try {
		const { transactionId } = req.params;
		const updatedTransaction = await transaction.findByIdAndUpdate(
			transactionId,
			req.body,
			{ new: true }
		);
		res.status(200).json(updatedTransaction);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ errors: [{ msg: error.message }] });
	}
};

export const deleteTransaction = async (req, res) => {
	try {
		const { transactionId } = req.params;
		const deletedTransaction = await transaction.findByIdAndDelete(
			transactionId
		);
		res.status(200).json({ message: 'The transaction has been deleted' });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ errors: [{ msg: error.message }] });
	}
};
