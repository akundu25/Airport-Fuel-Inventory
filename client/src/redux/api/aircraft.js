import API from './api';

export const fetchAircrafts = (limit, page) =>
	API.get(`/aircrafts/per-page?limit=${limit}&page=${page}`);

export const editAircraft = (newAircraft, page, limit) =>
	API.patch(`/aircrafts/edit?limit=${limit}&page=${page}`, newAircraft);

export const addAircraft = (newAircraft, page, limit) =>
	API.post(`/aircrafts/add?limit=${limit}&page=${page}`, newAircraft);

export const fetchAllAircrafts = () => API.get('/aircrafts/all');

export const fetchTopFiveAirline = () => API.get('/aircrafts/top-5');
