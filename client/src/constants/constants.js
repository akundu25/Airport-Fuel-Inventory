export const listItems = [
	{
		id: 1,
		path: '/dashboard',
		pathName: 'Dashboard',
	},
	{
		id: 2,
		path: '/airports',
		pathName: 'Airports',
	},
	{
		id: 3,
		path: '/aircrafts',
		pathName: 'Aircrafts',
	},
	{
		id: 4,
		path: '/transactions',
		pathName: 'Transactions',
	},
	{
		id: 6,
		path: '/fuel-consumption',
		pathName: 'Fuel Consumption Report',
	},
];

export const aircraftColumns = [
	{
		id: 1,
		col_name: 'AIRCRAFT NO',
		col_key: 'aircraft_no',
	},
	{
		id: 2,
		col_name: 'AIRLINE',
		col_key: 'airline',
	},
];

export const sampleAircraft = {
	aircraft_no: '',
	airline: '',
};

export const airportColumns = [
	{
		id: 1,
		col_name: 'AIRPORT NAME',
		col_key: 'airport_name',
	},
	{
		id: 2,
		col_name: 'FUEL AVAILABLE',
		col_key: 'fuel_available',
	},
	{
		id: 3,
		col_name: 'FUEL CAPACITY',
		col_key: 'fuel_capacity',
	},
];

export const sampleAirport = {
	airport_name: '',
	fuel_available: 0,
	fuel_capacity: 0,
};

export const transactionColumns = [
	{
		id: 1,
		col_name: 'DATE & TIME',
		col_key: 'transaction_date_time',
	},
	{
		id: 2,
		col_name: 'TRANSACTION TYPE',
		col_key: 'transaction_type',
	},
	{
		id: 3,
		col_name: 'QUANTITY',
		col_key: 'quantity',
	},
	{
		id: 4,
		col_name: 'AIRPORT',
		col_key: 'airport_name',
	},
	{
		id: 5,
		col_name: 'AIRCRAFT',
		col_key: 'aircraft_name',
	},
];

export const sampleTransaction = {
	transaction_date_time: '',
	transaction_type: '',
	airport_id: '',
	airport_name: '',
	aircraft_id: '',
	aircraft_name: 'N/A',
	quantity: 0,
	transaction_id_parent: '',
};

export const initialSignupForm = {
	name: '',
	email: '',
	password: '',
	confirmPassword: '',
};

export const initialLoginForm = {
	email: '',
	password: '',
};
