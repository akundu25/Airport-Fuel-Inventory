import * as types from '../types';

const initialState = {
	airports: null,
	transactions: null,
	allAirports: null,
	allTransactions: null,
	next: null,
};

const fuelConsumption = (state = initialState, action) => {
	switch (action.type) {
		case types.FETCH_FUEL_CONSUMPTION:
			return {
				...state,
				airports: state.airports
					? [...state.airports, ...action?.payload?.airports?.result]
					: [...action?.payload?.airports?.result],
				next: action?.payload?.airports?.next,
				transactions: state.transactions
					? [...state.transactions, ...action?.payload?.transactions]
					: [...action?.payload?.transactions],
			};
		case types.FETCH_ALL_FUEL_CONSUMPTION:
			return {
				...state,
				allAirports: state.allAirports
					? [...state.allAirports, ...action?.payload?.airports]
					: [...action?.payload?.airports],
				allTransactions: state.allTransactions
					? [...state.allTransactions, ...action?.payload?.transactions]
					: [...action?.payload?.transactions],
			};
		default:
			return state;
	}
};

export default fuelConsumption;
