import * as api from '../api/aircraft';
import * as types from '../actionTypes';
import { notify } from '../../constants/constants';

export const getAircrafts =
	(limit, page, setBg, setToastMessage, handleShowToast) =>
	async (dispatch) => {
		try {
			const { data } = await api.fetchAircrafts(limit, page);
			dispatch({ type: types.FETCH_AIRCRAFTS, payload: data });
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

export const updateAircraft =
	(newAircraft, page, limit, setBg, setToastMessage, handleShowToast) =>
	async (dispatch) => {
		try {
			const { data } = await api.editAircraft(newAircraft, page, limit);
			notify(
				'Aircraft updated successfully',
				'success',
				setBg,
				setToastMessage,
				handleShowToast
			);
			dispatch({ type: types.EDIT_AIRCRAFT, payload: data });
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

export const addNewAircraft =
	(newAircraft, page, limit, setBg, setToastMessage, handleShowToast) =>
	async (dispatch) => {
		try {
			const { data } = await api.addAircraft(newAircraft, page, limit);
			notify(
				'Aircraft added successfully',
				'success',
				setBg,
				setToastMessage,
				handleShowToast
			);
			dispatch({ type: types.ADD_AIRCRAFT, payload: data });
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

export const getAllAircrafts = () => async (dispatch) => {
	try {
		const { data } = await api.fetchAllAircrafts();
		dispatch({ type: types.FETCH_ALL_AIRCRAFTS, payload: data });
	} catch (error) {
		console.log(error);
	}
};

export const getTopFiveAirline = () => async (dispatch) => {
	try {
		const { data } = await api.fetchTopFiveAirline();
		dispatch({ type: types.FETCH_TOP_FIVE_AIRLINES, payload: data });
	} catch (error) {
		console.log(error);
	}
};
