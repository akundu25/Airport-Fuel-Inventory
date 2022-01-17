import * as types from '../types';

const initialState = {
	airports: null,
	transactions: null,
	nonTransactionAirports: null,
};

const fuelConsumption = (state = initialState, action) => {
	switch (action.type) {
		case types.FETCH_FUEL_CONSUMPTION:
			return {
				...state,
				airports: action?.payload?.airports,
				transactions: action?.payload?.transactions,
				nonTransactionAirports: action?.payload?.nonTransactionAirports,
			};
		default:
			return state;
	}
};

export default fuelConsumption;
