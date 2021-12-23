import * as types from '../types';
import * as api from '../api/api';

export const getFuelConsumption = (limit, page) => async (dispatch) => {
	try {
		const { data } = await api.fetchFuelConsumption(page, limit);
		dispatch({ type: types.FETCH_FUEL_CONSUMPTION, payload: data });
	} catch (error) {
		console.log(error);
	}
};

export const getAllFuelConsumption = () => async (dispatch) => {
	try {
		const { data } = await api.fetchAllFuelConsumption();
		dispatch({ type: types.FETCH_ALL_FUEL_CONSUMPTION, payload: data });
	} catch (error) {
		console.log(error);
	}
};
