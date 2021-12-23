import aircraft from '../models/aircraft.js';

const fetchingAircrafts = async (page, limit, res) => {
	try {
		const startIndex = (page - 1) * limit;
		const endIndex = page * limit;
		const aircraftCount = await aircraft.countDocuments();
		const results = {};

		if (startIndex > 0) {
			results.prev = {
				page: page - 1,
				limit,
			};
		}

		if (endIndex < aircraftCount) {
			results.next = {
				page: page + 1,
				limit,
			};
		}

		results.aircrafts = await aircraft
			.find()
			.limit(limit)
			.skip(startIndex)
			.sort({ aircraft_no: 1 });

		return res.status(200).json(results);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

export const fetchAircrafts = (req, res) => {
	const page = parseInt(req.query.page);
	const limit = parseInt(req.query.limit);
	return fetchingAircrafts(page, limit, res);
};

export const editAircraft = async (req, res) => {
	try {
		const { _id: id, aircraft_no, airline } = req.body;
		const page = parseInt(req.query.page);
		const limit = parseInt(req.query.limit);

		await aircraft.findByIdAndUpdate(id, { aircraft_no, airline });

		return fetchingAircrafts(page, limit, res);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error.message });
	}
};

export const addAircraft = async (req, res) => {
	try {
		const { aircraft_no, airline } = req.body;
		const page = parseInt(req.query.page);
		const limit = parseInt(req.query.limit);

		const oldAircraft = await aircraft.findOne({ aircraft_no });

		if (oldAircraft)
			return res
				.status(400)
				.json({ message: 'The airport already exists in the database' });

		await aircraft.create({ aircraft_no, airline });

		return fetchingAircrafts(page, limit, res);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error.message });
	}
};

export const fetchAllAircrafts = async (req, res) => {
	try {
		const allAircrafts = await aircraft.find();
		res.status(200).json(allAircrafts);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error.message });
	}
};
