import * as api from '../api/api';
import * as types from '../types';

export const getAirportsSummary = (limit, page) => async (dispatch) => {
	try {
		const { data } = await api.fetchAirports(limit, page);
		dispatch({ type: types.FETCH_AIRPORTS_SUMMARY, payload: data });
	} catch (error) {
		console.log(error);
	}
};

export const getAllAirportsSummary = () => async (dispatch) => {
	try {
		const { data } = await api.fetchAllAirports();
		dispatch({ type: types.FETCH_ALL_AIRPORTS_SUMMARY, payload: data });
	} catch (error) {
		console.log(error);
	}
};
