import * as types from '../types';
import * as api from '../api/api';

export const getFuelConsumption = () => async (dispatch) => {
	try {
		const { data } = await api.fetchFuelConsumption();
		dispatch({ type: types.FETCH_FUEL_CONSUMPTION, payload: data });
	} catch (error) {
		console.log(error);
	}
};
