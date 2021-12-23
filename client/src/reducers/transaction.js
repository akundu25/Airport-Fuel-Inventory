import * as types from '../types';

const initialState = {
	transactions: null,
	allTransactions: null,
	next: null,
	prev: null,
};

const transaction = (state = initialState, action) => {
	switch (action.type) {
		case types.FETCH_TRANSACTIONS:
		case types.ADD_TRANSACTION:
		case types.REVERSE_TRANSACTION:
			return {
				...state,
				transactions: action?.payload?.transactions,
				next: action?.payload?.next || null,
				prev: action?.payload?.prev || null,
			};
		case types.FETCH_ALL_TRANSACTIONS:
			return {
				...state,
				allTransactions: action?.payload,
			};
		default:
			return state;
	}
};

export default transaction;
