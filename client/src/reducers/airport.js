import * as types from '../types';

const initialState = {
	airports: null,
	allAirports: null,
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
		case types.CLEAN_AIRPORTS:
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

export default airport;
