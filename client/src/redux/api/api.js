import axios from 'axios';
import { baseURL } from '../../constants/constants';

const API = axios.create({ baseURL });

API.interceptors.request.use((req) => {
	if (localStorage.getItem('userProfile')) {
		req.headers.authorization = `Bearer ${
			JSON.parse(localStorage.getItem('userProfile')).token
		}`;
	}
	return req;
});

export default API;
