import * as types from '../types';

const initialState = {
	transactions: null,
	allTransactions: null,
	next: null,
	prev: null,
	success: '',
	error: null,
	pageCount: 0,
};

const transaction = (state = initialState, action) => {
	switch (action.type) {
		case types.ADD_TRANSACTION:
			return {
				...state,
				transactions: action?.payload?.transactions,
				next: action?.payload?.next || null,
				prev: action?.payload?.prev || null,
				pageCount: action?.payload?.pageCount,
				success: 'Transaction added successfully',
			};
		case types.FETCH_TRANSACTIONS:
			return {
				...state,
				transactions: action?.payload?.transactions,
				next: action?.payload?.next || null,
				prev: action?.payload?.prev || null,
				pageCount: action?.payload?.pageCount,
			};
		case types.REVERSE_TRANSACTION:
			return {
				...state,
				transactions: action?.payload?.transactions,
				next: action?.payload?.next || null,
				prev: action?.payload?.prev || null,
				pageCount: action?.payload?.pageCount,
				success: 'Transaction reversed successfully',
			};
		case types.TRANSACTION_ERROR:
			return {
				...state,
				error: action?.payload,
			};
		case types.SUCCESS_ERROR_REMOVE_TRANSACTION:
			return {
				...state,
				error: null,
				success: '',
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
