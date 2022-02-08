import * as types from '../actionTypes';

const initialState = {
	aircrafts: null,
	allAircrafts: null,
	next: null,
	prev: null,
	top5Airlines: null,
	pageCount: 0,
};

const aircraft = (state = initialState, action) => {
	switch (action.type) {
		case types.ADD_AIRCRAFT:
		case types.EDIT_AIRCRAFT:
		case types.FETCH_AIRCRAFTS:
			return {
				...state,
				aircrafts: action?.payload?.aircrafts,
				next: action?.payload?.next || null,
				prev: action?.payload?.prev || null,
				pageCount: action?.payload?.pageCount,
			};
		case types.FETCH_ALL_AIRCRAFTS:
			return {
				...state,
				allAircrafts: action?.payload,
			};
		case types.FETCH_TOP_FIVE_AIRLINES:
			return {
				...state,
				top5Airlines: action?.payload,
			};
		default:
			return state;
	}
};

export default aircraft;
