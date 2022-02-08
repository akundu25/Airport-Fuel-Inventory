import * as api from '../api/airport';
import * as types from '../actionTypes';
import { notify } from '../../constants/constants';

export const getAirports =
	(limit, page, setBg, setToastMessage, handleShowToast) =>
	async (dispatch) => {
		try {
			const { data } = await api.fetchAirports(limit, page);
			dispatch({ type: types.FETCH_AIRPORTS, payload: data });
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

export const updateAirport =
	(newAirport, page, limit, setBg, setToastMessage, handleShowToast) =>
	async (dispatch) => {
		try {
			const { data } = await api.editAirport(newAirport, page, limit);
			notify(
				'Airport updated successfully',
				'success',
				setBg,
				setToastMessage,
				handleShowToast
			);
			dispatch({ type: types.EDIT_AIRPORT, payload: data });
		} catch (error) {
			const { data } = error?.response;
			data?.errors.length && notify(data?.errors[0].msg, 'error');
			console.log(error.response);
		}
	};

export const addNewAirport =
	(newAirport, page, limit, setBg, setToastMessage, handleShowToast) =>
	async (dispatch) => {
		try {
			const { data } = await api.addAirport(newAirport, page, limit);
			notify(
				'Airport added successfully',
				'success',
				setBg,
				setToastMessage,
				handleShowToast
			);
			dispatch({ type: types.ADD_AIRPORT, payload: data });
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

export const getAllAirports = () => async (dispatch) => {
	try {
		const { data } = await api.fetchAllAirports();
		dispatch({ type: types.FETCH_ALL_AIRPORTS, payload: data });
	} catch (error) {
		console.log(error);
	}
};

export const getTopFiveAirports = () => async (dispatch) => {
	try {
		const { data } = await api.fetchTopFiveAirports();
		dispatch({ type: types.FETCH_TOP_FIVE_AIRPORTS, payload: data });
	} catch (error) {
		console.log(error);
	}
};
