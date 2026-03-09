import API from './axios';

export const getTasks = (params = {}) => API.get('/tasks', { params });

export const getTask = (id) => API.get(`/tasks/${id}`);

export const createTask = (data) => API.post('/tasks', data);

export const updateTask = (id, data) => API.put(`/tasks/${id}`, data);

export const toggleTask = (id) => API.patch(`/tasks/${id}/toggle`);

export const deleteTask = (id) => API.delete(`/tasks/${id}`);

export const getReminders = () => API.get('/tasks/reminders');
