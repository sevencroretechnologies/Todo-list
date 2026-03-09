import API from './axios';

export const register = (data) => API.post('/register', data);

export const login = (data) => API.post('/login', data);

export const logout = () => API.post('/logout');

export const getUser = () => API.get('/user');
