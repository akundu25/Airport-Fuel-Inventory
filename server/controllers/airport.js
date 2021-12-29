import airport from '../models/airport.js';

const fetchingAirports = async (page, limit, res) => {
	try {
		const startIndex = (page - 1) * limit;
		const endIndex = page * limit;
		const airportCount = await airport.countDocuments();
		const results = {};

		if (startIndex > 0) {
			results.prev = {
				page: page - 1,
				limit,
			};
		}

		if (endIndex < airportCount) {
			results.next = {
				page: page + 1,
				limit,
			};
		}

		results.airports = await airport
			.find()
			.limit(limit)
			.skip(startIndex)
			.sort({ airport_name: 1 });

		return res.status(200).json(results);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ errors: [{ msg: error.message }] });
	}
};

export const fetchAirports = (req, res) => {
	const page = parseInt(req.query.page);
	const limit = parseInt(req.query.limit);

	return fetchingAirports(page, limit, res);
};

export const editAirport = async (req, res) => {
	try {
		const { _id: id, airport_name, fuel_available, fuel_capacity } = req.body;
		const page = parseInt(req.query.page);
		const limit = parseInt(req.query.limit);

		if (parseInt(fuel_available) > parseInt(fuel_capacity))
			return res
				.status(400)
				.json({ errors: [{ msg: 'Error: Fuel available > fuel capacity' }] });

		await airport.findByIdAndUpdate(id, {
			airport_name,
			fuel_available,
			fuel_capacity,
		});

		return fetchingAirports(page, limit, res);
	} catch (error) {
		console.log(error);
		res.status(500).json({ errors: [{ msg: error.message }] });
	}
};

export const addAirport = async (req, res) => {
	try {
		const { airport_name, fuel_available, fuel_capacity } = req.body;
		const page = parseInt(req.query.page);
		const limit = parseInt(req.query.limit);

		const oldAirport = await airport.findOne({ airport_name });

		if (oldAirport)
			return res.status(400).json({
				errors: [{ msg: 'Error: Airport already exist' }],
			});

		if (parseInt(fuel_available) > parseInt(fuel_capacity))
			return res.status(400).json({
				errors: [{ msg: 'Error: Fuel available > fuel capacity' }],
			});

		await airport.create({
			airport_name,
			fuel_available,
			fuel_capacity,
			no_of_transactions: 0,
		});

		return fetchingAirports(page, limit, res);
	} catch (error) {
		console.log(error);
		res.status(500).json({ errors: [{ msg: error.message }] });
	}
};

export const fetchAllAirports = async (req, res) => {
	try {
		const allAirports = await airport.find();
		res.status(200).json(allAirports);
	} catch (error) {
		console.log(error);
		res.status(500).json({ errors: [{ msg: error.message }] });
	}
};

export const fetchTopFiveAirports = async (req, res) => {
	try {
		const top5NoOfTransactions = await airport
			.find()
			.limit(5)
			.sort({ no_of_transactions: -1 });

		const top5FuelAvailable = await airport
			.find()
			.limit(5)
			.sort({ fuel_available: -1 });

		const top5FuelCapacity = await airport
			.find()
			.limit(5)
			.sort({ fuel_capacity: -1 });
		res
			.status(200)
			.json({ top5NoOfTransactions, top5FuelAvailable, top5FuelCapacity });
	} catch (error) {
		console.log(error);
		res.status(500).json({ errors: [{ msg: error.message }] });
	}
};
