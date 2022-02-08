import * as types from '../actionTypes';

const initialState = {
	name: '',
	email: '',
};

const user = (state = initialState, action) => {
	switch (action.type) {
		case types.USER_AUTH_LOGIN:
			localStorage.setItem('userProfile', JSON.stringify(action?.payload));
			return {
				...state,
				...action?.payload?.clientUser,
			};
		default:
			return state;
	}
};

export default user;
