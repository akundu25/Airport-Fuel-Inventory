import airport from '../models/airport.js';

const fetchingAirports = async (page, limit, res) => {
	try {
		const startIndex = (page - 1) * limit;
		const endIndex = page * limit;
		const airportCount = await airport.countDocuments();
		const results = {};
		const pageCount = Math.ceil(airportCount / limit);

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

		results.pageCount = pageCount;

		return res.status(200).json(results);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ errors: [{ msg: error.message }] });
	}
};

export const fetchAirports = (req, res) => {
	const { type } = req.params;
	if (type === 'per-page') {
		const page = parseInt(req.query.page);
		const limit = parseInt(req.query.limit);

		return fetchingAirports(page, limit, res);
	} else if (type === 'all') {
		return fetchAllAirports(res);
	} else if (type === 'top-5') {
		return fetchTopFiveAirports(res);
	}
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

const fetchAllAirports = async (res) => {
	try {
		const allAirports = await airport.find();
		return res.status(200).json(allAirports);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ errors: [{ msg: error.message }] });
	}
};

const fetchTopFiveAirports = async (res) => {
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
		return res
			.status(200)
			.json({ top5NoOfTransactions, top5FuelAvailable, top5FuelCapacity });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ errors: [{ msg: error.message }] });
	}
};

export const updateAirport = async (req, res) => {
	try {
		const { airportId } = req.params;
		const { airport_name, fuel_available, fuel_capacity } = req.body;
		const updatedAirport = await airport.findByIdAndUpdate(
			airportId,
			{ airport_name, fuel_available, fuel_capacity },
			{ new: true }
		);
		res.status(200).json(updatedAirport);
	} catch (error) {
		console.log(error);
		res.status(500).json({ errors: [{ msg: error.message }] });
	}
};

export const deleteAirport = async (req, res) => {
	try {
		const { airportId } = req.params;
		await airport.findByIdAndDelete(airportId);
		res
			.status(200)
			.json({ message: 'The airport has been deleted successfully' });
	} catch (error) {
		console.log(error);
		res.status(500).json({ errors: [{ msg: error.message }] });
	}
};
