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
	API.get(`/airport?limit=${limit}&page=${page}`);

export const editAirport = (newAirport, page, limit) =>
	API.patch(`/airport/edit?limit=${limit}&page=${page}`, newAirport);

export const addAirport = (newAirport, page, limit) =>
	API.post(`/airport/add?limit=${limit}&page=${page}`, newAirport);

export const fetchAllAirports = () => API.get('/airport/all');

export const fetchTopFiveAirports = () => API.get('/airport/top-5-airports');

// aircrafts

export const fetchAircrafts = (limit, page) =>
	API.get(`/aircraft?limit=${limit}&page=${page}`);

export const editAircraft = (newAircraft, page, limit) =>
	API.patch(`/aircraft/edit?limit=${limit}&page=${page}`, newAircraft);

export const addAircraft = (newAircraft, page, limit) =>
	API.post(`/aircraft/add?limit=${limit}&page=${page}`, newAircraft);

export const fetchAllAircrafts = () => API.get('/aircraft/all');

// transactions

export const addTransaction = (transaction, page, limit) =>
	API.post(`/transaction/add?page=${page}&limit=${limit}`, transaction);

export const fetchTransactions = (page, limit) =>
	API.get(`/transaction?page=${page}&limit=${limit}`);

export const reverseTransaction = (page, limit, transaction) =>
	API.post(`/transaction/reverse?limit=${limit}&page=${page}`, transaction);

export const fetchAllTransactions = () => API.get('/transaction/all');

//fuel consumption

export const fetchFuelConsumption = (page, limit) =>
	API.get(`/fuel-consumption?limit=${limit}&page=${page}`);

export const fetchAllFuelConsumption = () => API.get('/fuel-consumption/all');
