import * as types from '../types';

const initialState = {
	aircrafts: null,
	allAircrafts: null,
	next: null,
	prev: null,
	success: '',
	error: null,
};

const aircraft = (state = initialState, action) => {
	switch (action.type) {
		case types.ADD_AIRCRAFT:
			return {
				...state,
				aircrafts: action?.payload?.aircrafts,
				next: action?.payload?.next || null,
				prev: action?.payload?.prev || null,
				success: 'Aircraft added successfully',
			};
		case types.EDIT_AIRCRAFT:
			return {
				...state,
				aircrafts: action?.payload?.aircrafts,
				next: action?.payload?.next || null,
				prev: action?.payload?.prev || null,
				success: 'Aircraft updated successfully',
			};
		case types.FETCH_AIRCRAFTS:
			return {
				...state,
				aircrafts: action?.payload?.aircrafts,
				next: action?.payload?.next || null,
				prev: action?.payload?.prev || null,
			};
		case types.AIRCRAFT_ERROR:
			return {
				...state,
				error: action?.payload,
			};
		case types.SUCCESS_ERROR_REMOVE_AIRCRAFT:
			return {
				...state,
				success: '',
				error: null,
			};
		case types.FETCH_ALL_AIRCRAFTS:
			return {
				...state,
				allAircrafts: action?.payload,
			};
		case types.CLEAN_AIRCRAFTS:
			return {
				...state,
				aircrafts: null,
				next: null,
				prev: null,
			};
		default:
			return state;
	}
};

export default aircraft;
