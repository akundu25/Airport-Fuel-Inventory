import * as api from '../api/api';
import * as types from '../types';

export const getAirports = (limit, page) => async (dispatch) => {
	try {
		const { data } = await api.fetchAirports(limit, page);
		dispatch({ type: types.FETCH_AIRPORTS, payload: data });
	} catch (error) {
		console.log(error);
	}
};

export const updateAirport = (newAirport, page, limit) => async (dispatch) => {
	try {
		const { data } = await api.editAirport(newAirport, page, limit);
		dispatch({ type: types.EDIT_AIRPORT, payload: data });
	} catch (error) {
		console.log(error);
	}
};

export const addNewAirport = (newAirport, page, limit) => async (dispatch) => {
	try {
		const { data } = await api.addAirport(newAirport, page, limit);
		dispatch({ type: types.ADD_AIRPORT, payload: data });
	} catch (error) {
		console.log(error);
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
