import * as api from '../api/user';
import * as types from '../actionTypes';
import { notify } from '../../constants/constants';

//function to login user

export const loginUser =
	(userInfo, navigate, setBg, setToastMessage, handleShowToast) =>
	async (dispatch) => {
		try {
			const { data } = await api.userLogin(userInfo);
			dispatch({ type: types.USER_AUTH_LOGIN, payload: data });
			navigate('/dashboard');
		} catch (error) {
			const { data } = error?.response;
			data?.errors.length &&
				notify(
					data?.errors[0].msg,
					'danger',
					setBg,
					setToastMessage,
					handleShowToast
				);
			console.log(error.response);
		}
	};

//function to signup new users

export const signupUser =
	(userInfo, setBg, setToastMessage, handleShowToast) => async (dispatch) => {
		try {
			const { data } = await api.signupUser(userInfo);
			notify(data?.message, 'success', setBg, setToastMessage, handleShowToast);
		} catch (error) {
			const { data } = error?.response;
			data?.errors.length &&
				notify(
					data?.errors[0].msg,
					'danger',
					setBg,
					setToastMessage,
					handleShowToast
				);
			console.log(error.response);
		}
	};
