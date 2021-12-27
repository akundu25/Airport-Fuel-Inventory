import * as types from '../types';

const initialState = {
	airports: null,
	allAirports: null,
	next: null,
	prev: null,
};

const airportSummary = (state = initialState, action) => {
	switch (action.type) {
		case types.FETCH_AIRPORTS_SUMMARY:
			return {
				...state,
				airports: action?.payload?.airports,
				next: action?.payload?.next || null,
				prev: action?.payload?.prev || null,
			};
		case types.FETCH_ALL_AIRPORTS_SUMMARY:
			return {
				...state,
				allAirports: action?.payload,
			};
		case types.CLEAN_AIRPORTS_SUMMARY:
			return {
				...state,
				airports: null,
				next: null,
				prev: null,
			};
		default:
			return state;
	}
};

export default airportSummary;
