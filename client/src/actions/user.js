import * as api from '../api/api';
import * as types from '../types';

export const loginUser = (userInfo, navigate) => async (dispatch) => {
	try {
		const { data } = await api.userLogin(userInfo);
		dispatch({ type: types.USER_AUTH, payload: data });
		navigate('/dashboard');
	} catch (error) {
		console.log(error);
	}
};

export const signupUser = (userInfo, navigate) => async (dispatch) => {
	try {
		const { data } = await api.signupUser(userInfo);
		dispatch({ type: types.USER_AUTH, payload: data });
		navigate('/dashboard');
	} catch (error) {
		console.log(error);
	}
};
