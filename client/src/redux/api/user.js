import API from './api';

export const userLogin = (userInfo) => API.post('/user/login', userInfo);

export const signupUser = (userInfo) => API.post('/user/signup', userInfo);
