import * as types from '../actionTypes';
import * as api from '../api/fuelConsumption';

//fetching airport details and their fuel consumption records

export const getFuelConsumption = () => async (dispatch) => {
	try {
		const { data } = await api.fetchFuelConsumption();
		dispatch({ type: types.FETCH_FUEL_CONSUMPTION, payload: data });
	} catch (error) {
		console.log(error);
	}
};
