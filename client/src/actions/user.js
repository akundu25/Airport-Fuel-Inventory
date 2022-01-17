import * as api from '../api/api';
import * as types from '../types';

export const loginUser = (userInfo, navigate) => async (dispatch) => {
	try {
		const { data } = await api.userLogin(userInfo);
		dispatch({ type: types.USER_AUTH_LOGIN, payload: data });
		navigate('/dashboard');
	} catch (error) {
		const { data } = error?.response;
		dispatch({ type: types.USER_AUTH_ERROR, payload: data?.errors });
		console.log(error.response);
	}
};

export const signupUser = (userInfo) => async (dispatch) => {
	try {
		const { data } = await api.signupUser(userInfo);
		dispatch({ type: types.USER_AUTH_SIGNUP, payload: data });
	} catch (error) {
		const { data } = error?.response;
		dispatch({ type: types.USER_AUTH_ERROR, payload: data?.errors });
		console.log(error.response);
	}
};
