import * as types from '../types';
import * as api from '../api/api';

export const addNewTransaction =
	(page, limit, transaction) => async (dispatch) => {
		try {
			const { data } = await api.addTransaction(transaction, page, limit);

			dispatch({ type: types.ADD_TRANSACTION, payload: data });
		} catch (error) {
			console.log(error.response);
			const { data } = error.response;
			dispatch({ type: types.TRANSACTION_ERROR, payload: data.errors[0] });
		}
	};

export const undoTransaction =
	(limit, page, transaction) => async (dispatch) => {
		try {
			const { data } = await api.reverseTransaction(page, limit, transaction);

			dispatch({ type: types.REVERSE_TRANSACTION, payload: data });
		} catch (error) {
			console.log(error.response);
			const { data } = error.response;
			dispatch({ type: types.TRANSACTION_ERROR, payload: data.errors[0] });
		}
	};

export const getTransactions = (limit, page) => async (dispatch) => {
	try {
		const { data } = await api.fetchTransactions(page, limit);

		dispatch({ type: types.FETCH_TRANSACTIONS, payload: data });
	} catch (error) {
		console.log(error.response);
		const { data } = error.response;
		dispatch({ type: types.TRANSACTION_ERROR, payload: data.errors[0] });
	}
};

export const getAllTransactions = () => async (dispatch) => {
	try {
		const { data } = await api.fetchAllTransactions();
		dispatch({ type: types.FETCH_ALL_TRANSACTIONS, payload: data });
	} catch (error) {
		console.log(error);
	}
};
