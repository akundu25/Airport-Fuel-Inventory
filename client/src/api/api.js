import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
	if (localStorage.getItem('userProfile')) {
		req.headers.authorization = `Bearer ${
			JSON.parse(localStorage.getItem('userProfile')).token
		}`;
	}
	return req;
});

export const userLogin = (userInfo) => API.post('/user/login', userInfo);

export const signupUser = (userInfo) => API.post('/user/signup', userInfo);

// airports

export const fetchAirports = (limit, page) =>
	API.get(`/airports/per-page?limit=${limit}&page=${page}`);

export const editAirport = (newAirport, page, limit) =>
	API.patch(`/airports/edit?limit=${limit}&page=${page}`, newAirport);

export const addAirport = (newAirport, page, limit) =>
	API.post(`/airports/add?limit=${limit}&page=${page}`, newAirport);

export const fetchAllAirports = () => API.get('/airports/all');

export const fetchTopFiveAirports = () => API.get('/airports/top-5');

// aircrafts

export const fetchAircrafts = (limit, page) =>
	API.get(`/aircrafts/per-page?limit=${limit}&page=${page}`);

export const editAircraft = (newAircraft, page, limit) =>
	API.patch(`/aircrafts/edit?limit=${limit}&page=${page}`, newAircraft);

export const addAircraft = (newAircraft, page, limit) =>
	API.post(`/aircrafts/add?limit=${limit}&page=${page}`, newAircraft);

export const fetchAllAircrafts = () => API.get('/aircrafts/all');

export const fetchTopFiveAirline = () => API.get('/aircrafts/top-5');

// transactions

export const addTransaction = (transaction, page, limit) =>
	API.post(`/transactions/add?page=${page}&limit=${limit}`, transaction);

export const fetchTransactions = (page, limit) =>
	API.get(`/transactions/fetch/per-page?page=${page}&limit=${limit}`);

export const reverseTransaction = (page, limit, transaction) =>
	API.post(`/transactions/reverse?limit=${limit}&page=${page}`, transaction);

export const fetchAllTransactions = () => API.get('/transactions/all');

//fuel consumption

export const fetchFuelConsumption = () => API.get(`/fuel-consumption-report`);
