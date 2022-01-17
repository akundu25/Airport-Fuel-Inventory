import { combineReducers } from 'redux';
import * as types from '../types';
import user from './user';
import airport from './airport';
import aircraft from './aircraft';
import transaction from './transaction';
import fuelConsumption from './fuelConsumption';

const appReducer = combineReducers({
	user,
	airport,
	aircraft,
	transaction,
	fuelConsumption,
});

const rootReducer = (state, action) => {
	if (action.type === types.LOGOUT) {
		localStorage.removeItem('userProfile');
		state = undefined;
	}

	return appReducer(state, action);
};

export default rootReducer;
