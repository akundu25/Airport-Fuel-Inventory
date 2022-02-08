import API from './api';

export const fetchAirports = (limit, page) =>
	API.get(`/airports/per-page?limit=${limit}&page=${page}`);

export const editAirport = (newAirport, page, limit) =>
	API.patch(`/airports/edit?limit=${limit}&page=${page}`, newAirport);

export const addAirport = (newAirport, page, limit) =>
	API.post(`/airports/add?limit=${limit}&page=${page}`, newAirport);

export const fetchAllAirports = () => API.get('/airports/all');

export const fetchTopFiveAirports = () => API.get('/airports/top-5');
