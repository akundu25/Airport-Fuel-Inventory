import * as types from '../types';

const initialState = {
	airports: null,
	allAirports: null,
	top5NoOfTransactions: null,
	top5FuelAvailable: null,
	top5FuelCapacity: null,
	next: null,
	prev: null,
	error: null,
	success: '',
	pageCount: 0,
};

const airport = (state = initialState, action) => {
	switch (action.type) {
		case types.ADD_AIRPORT:
			return {
				...state,
				airports: action?.payload?.airports,
				next: action?.payload?.next || null,
				prev: action?.payload?.prev || null,
				pageCount: action?.payload?.pageCount,
				success: 'Airport added successfully',
			};
		case types.FETCH_AIRPORTS:
			return {
				...state,
				airports: action?.payload?.airports,
				next: action?.payload?.next || null,
				prev: action?.payload?.prev || null,
				pageCount: action?.payload?.pageCount,
			};
		case types.EDIT_AIRPORT:
			return {
				...state,
				airports: action?.payload?.airports,
				next: action?.payload?.next || null,
				prev: action?.payload?.prev || null,
				pageCount: action?.payload?.pageCount,
				success: 'Airport updated successfully',
			};
		case types.SUCCESS_ERROR_REMOVE_AIRPORT:
			return {
				...state,
				success: '',
				error: null,
			};
		case types.AIRPORT_ERROR:
			return {
				...state,
				error: action?.payload,
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
		default:
			return state;
	}
};

export default airport;
