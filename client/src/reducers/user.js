import * as types from '../types';

const initialState = {
	name: '',
	email: '',
};

const user = (state = initialState, action) => {
	switch (action.type) {
		case types.USER_AUTH:
			localStorage.setItem('userProfile', JSON.stringify(action?.payload));
			return {
				...state,
				...action?.payload?.clientUser,
			};
		case types.LOGOUT:
			localStorage.removeItem('userProfile');
			return {
				...state,
				name: '',
				email: '',
			};
		default:
			return state;
	}
};

export default user;
