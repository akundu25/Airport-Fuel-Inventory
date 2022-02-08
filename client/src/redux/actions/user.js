import * as api from '../api/user';
import * as types from '../actionTypes';
import { toast } from 'react-toastify';

const notify = (message, type) => {
	switch (type) {
		case 'success':
			toast.success(message);
			break;
		case 'error':
			toast.error(message);
			break;
		default:
			break;
	}
};

export const loginUser = (userInfo, navigate) => async (dispatch) => {
	try {
		const { data } = await api.userLogin(userInfo);
		dispatch({ type: types.USER_AUTH_LOGIN, payload: data });
		navigate('/dashboard');
	} catch (error) {
		const { data } = error?.response;
		data?.errors.length && notify(data.errors[0].msg, 'error');
		console.log(error.response);
	}
};

export const signupUser = (userInfo) => async (dispatch) => {
	try {
		const { data } = await api.signupUser(userInfo);
		notify(data?.message, 'success');
	} catch (error) {
		const { data } = error?.response;
		data?.errors.length && notify(data.errors[0].msg, 'error');
		console.log(error.response);
	}
};
