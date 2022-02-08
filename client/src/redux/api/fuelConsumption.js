import API from './api';

export const fetchFuelConsumption = () => API.get(`/fuel-consumption-report`);
