import aircraft from '../models/aircraft.js';

const fetchingAircrafts = async (page, limit, res) => {
	try {
		const startIndex = (page - 1) * limit;
		const endIndex = page * limit;
		const aircraftCount = await aircraft.countDocuments();
		const pageCount = Math.ceil(aircraftCount / limit);
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

		results.pageCount = pageCount;

		return res.status(200).json(results);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ errors: [{ msg: error.message }] });
	}
};

export const fetchAircrafts = (req, res) => {
	const { type } = req.params;
	if (type === 'per-page') {
		const page = parseInt(req.query.page);
		const limit = parseInt(req.query.limit);
		return fetchingAircrafts(page, limit, res);
	} else if (type === 'all') {
		return fetchAllAircrafts(res);
	} else if (type === 'top-5') {
		return fetchTopFiveAirline(res);
	}
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
		res.status(500).json({ errors: [{ msg: error.message }] });
	}
};

export const addAircraft = async (req, res) => {
	try {
		const { aircraft_no, airline } = req.body;
		const page = parseInt(req.query.page);
		const limit = parseInt(req.query.limit);

		const oldAircraft = await aircraft.findOne({ aircraft_no });

		if (oldAircraft)
			return res.status(400).json({
				errors: [{ msg: 'Error: Aircraft already exist' }],
			});

		await aircraft.create({ aircraft_no, airline });

		return fetchingAircrafts(page, limit, res);
	} catch (error) {
		console.log(error);
		res.status(500).json({ errors: [{ msg: error.message }] });
	}
};

const fetchAllAircrafts = async (res) => {
	try {
		const allAircrafts = await aircraft.find();
		return res.status(200).json(allAircrafts);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ errors: [{ msg: error.message }] });
	}
};

const sortAirlines = (a, b) => {
	if (b[1].no_of_aircrafts < a[1].no_of_aircrafts) return -1;
	return 1;
};

const fetchTopFiveAirline = async (res) => {
	try {
		const allAircrafts = await aircraft.find();
		const airlines = {};

		for (let { airline } of allAircrafts) {
			if (airline in airlines) {
				airlines[airline].no_of_aircrafts += 1;
			} else {
				airlines[airline] = {
					no_of_aircrafts: 1,
				};
			}
		}

		const airlinesArray = Object.entries(airlines);
		airlinesArray.sort(sortAirlines);
		const top5Airlines = airlinesArray.slice(0, 5);
		return res.status(200).json(top5Airlines);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ errors: [{ msg: error.message }] });
	}
};

export const updateAircraft = async (req, res) => {
	try {
		const { aircraftId } = req.params;
		const updatedAircraft = await aircraft.findByIdAndUpdate(
			aircraftId,
			req.body,
			{ new: true }
		);
		res.status(200).json(updatedAircraft);
	} catch (error) {
		console.log(error);
		res.status(500).json({ errors: [{ msg: error.message }] });
	}
};

export const deleteAircraft = async (req, res) => {
	try {
		const { aircraftId } = req.params;
		await aircraft.findByIdAndDelete(aircraftId);
		res
			.status(200)
			.json({ message: 'The aircraft has been deleted successfully' });
	} catch (error) {
		console.log(error);
		res.status(500).json({ errors: [{ msg: error.message }] });
	}
};
