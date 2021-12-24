import * as types from '../types';

const initialState = {
	name: '',
	email: '',
	error: '',
};

const user = (state = initialState, action) => {
	switch (action.type) {
		case types.USER_AUTH:
			localStorage.setItem('userProfile', JSON.stringify(action?.payload));
			return {
				...state,
				...action?.payload?.clientUser,
			};
		case types.USER_AUTH_ERROR:
			return {
				...state,
				error: action?.payload,
			};
		case types.USER_AUTH_ERROR_REMOVE:
			return {
				...state,
				error: '',
			};
		case types.LOGOUT:
			localStorage.removeItem('userProfile');
			return {
				...state,
				name: '',
				email: '',
				error: '',
			};
		default:
			return state;
	}
};

export default user;
