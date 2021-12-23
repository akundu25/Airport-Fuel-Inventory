import { combineReducers } from 'redux';
import user from './user';
import airport from './airport';
import aircraft from './aircraft';
import transaction from './transaction';
import fuelConsumption from './fuelConsumption';

const rootReducer = combineReducers({
	user,
	airport,
	aircraft,
	transaction,
	fuelConsumption,
});

export default rootReducer;
