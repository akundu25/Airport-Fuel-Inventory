import * as api from '../api/api';
import * as types from '../types';

export const getAircrafts = (limit, page) => async (dispatch) => {
	try {
		const { data } = await api.fetchAircrafts(limit, page);
		dispatch({ type: types.FETCH_AIRCRAFTS, payload: data });
	} catch (error) {
		console.log(error.response);
		const { data } = error?.response;
		dispatch({ type: types.AIRCRAFT_ERROR, payload: data?.errors[0] });
	}
};

export const updateAircraft =
	(newAircraft, page, limit) => async (dispatch) => {
		try {
			const { data } = await api.editAircraft(newAircraft, page, limit);
			dispatch({ type: types.EDIT_AIRCRAFT, payload: data });
		} catch (error) {
			console.log(error.response);
			const { data } = error?.response;
			dispatch({ type: types.AIRCRAFT_ERROR, payload: data?.errors[0] });
		}
	};

export const addNewAircraft =
	(newAircraft, page, limit) => async (dispatch) => {
		try {
			const { data } = await api.addAircraft(newAircraft, page, limit);
			dispatch({ type: types.ADD_AIRCRAFT, payload: data });
		} catch (error) {
			console.log(error.response);
			const { data } = error?.response;
			dispatch({ type: types.AIRCRAFT_ERROR, payload: data?.errors[0] });
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
