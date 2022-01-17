import * as types from '../types';

const initialState = {
	name: '',
	email: '',
	error: null,
	success: '',
};

const user = (state = initialState, action) => {
	switch (action.type) {
		case types.USER_AUTH_LOGIN:
			localStorage.setItem('userProfile', JSON.stringify(action?.payload));
			return {
				...state,
				...action?.payload?.clientUser,
			};
		case types.USER_AUTH_SIGNUP:
			return {
				...state,
				success: action?.payload?.message,
			};
		case types.USER_AUTH_ERROR:
			return {
				...state,
				error: action?.payload,
			};
		case types.USER_AUTH_ERROR_REMOVE:
			return {
				...state,
				error: null,
				success: '',
			};
		default:
			return state;
	}
};

export default user;
