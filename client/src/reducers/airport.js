import * as types from '../types';

const initialState = {
	airports: null,
	allAirports: null,
	top5NoOfTransactions: null,
	top5FuelAvailable: null,
	top5FuelCapacity: null,
	next: null,
	prev: null,
};

const airport = (state = initialState, action) => {
	switch (action.type) {
		case types.ADD_AIRPORT:
		case types.EDIT_AIRPORT:
		case types.FETCH_AIRPORTS:
			return {
				...state,
				airports: action?.payload?.airports,
				next: action?.payload?.next || null,
				prev: action?.payload?.prev || null,
			};
		case types.FETCH_ALL_AIRPORTS:
			return {
				...state,
				allAirports: action?.payload,
			};
		case types.FETCH_TOP_FIVE_AIRPORTS:
			return {
				...state,
				top5NoOfTransactions: action?.payload?.top5NoOfTransactions,
				top5FuelAvailable: action?.payload?.top5FuelAvailable,
				top5FuelCapacity: action?.payload?.top5FuelCapacity,
			};
		case types.CLEAN_AIRPORTS:
			return {
				...state,
				airports: null,
				next: null,
				prev: null,
			};
		case types.CLEAN_CHARTS_DATA:
			return {
				...state,
				top5NoOfTransactions: null,
				top5FuelAvailable: null,
				top5FuelCapacity: null,
			};
		default:
			return state;
	}
};

export default airport;
