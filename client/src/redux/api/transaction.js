import API from './api';

export const addTransaction = (transaction, page, limit) =>
	API.post(`/transactions/add?page=${page}&limit=${limit}`, transaction);

export const fetchTransactions = (page, limit) =>
	API.get(`/transactions/fetch/per-page?page=${page}&limit=${limit}`);

export const reverseTransaction = (page, limit, transaction) =>
	API.post(`/transactions/reverse?limit=${limit}&page=${page}`, transaction);

export const fetchAllTransactions = () => API.get('/transactions/all');
