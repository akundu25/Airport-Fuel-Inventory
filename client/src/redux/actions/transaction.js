import * as types from '../actionTypes';
import * as api from '../api/transaction';
import { notify } from '../../constants/constants';

//adding new transactions

export const addNewTransaction =
	(page, limit, transaction, setBg, setToastMessage, handleShowToast) =>
	async (dispatch) => {
		try {
			const { data } = await api.addTransaction(transaction, page, limit);
			notify(
				'Transaction added successfully',
				'success',
				setBg,
				setToastMessage,
				handleShowToast
			);
			dispatch({ type: types.ADD_TRANSACTION, payload: data });
		} catch (error) {
			const { data } = error?.response;
			data?.errors.length &&
				notify(
					data?.errors[0].msg,
					'danger',
					setBg,
					setToastMessage,
					handleShowToast
				);
			console.log(error.response);
		}
	};

//reversing existing transactions

export const undoTransaction =
	(limit, page, transaction, setBg, setToastMessage, handleShowToast) =>
	async (dispatch) => {
		try {
			const { data } = await api.reverseTransaction(page, limit, transaction);
			notify(
				'Transaction reversed successfully',
				'success',
				setBg,
				setToastMessage,
				handleShowToast
			);
			dispatch({ type: types.REVERSE_TRANSACTION, payload: data });
		} catch (error) {
			const { data } = error?.response;
			data?.errors.length &&
				notify(
					data?.errors[0].msg,
					'danger',
					setBg,
					setToastMessage,
					handleShowToast
				);
			console.log(error.response);
		}
	};

//fetching transactions per page

export const getTransactions =
	(limit, page, setBg, setToastMessage, handleShowToast) =>
	async (dispatch) => {
		try {
			const { data } = await api.fetchTransactions(page, limit);

			dispatch({ type: types.FETCH_TRANSACTIONS, payload: data });
		} catch (error) {
			const { data } = error?.response;
			data?.errors.length &&
				notify(
					data?.errors[0].msg,
					'danger',
					setBg,
					setToastMessage,
					handleShowToast
				);
			console.log(error.response);
		}
	};

//fetching all transactions at once

export const getAllTransactions = () => async (dispatch) => {
	try {
		const { data } = await api.fetchAllTransactions();
		dispatch({ type: types.FETCH_ALL_TRANSACTIONS, payload: data });
	} catch (error) {
		console.log(error);
	}
};
