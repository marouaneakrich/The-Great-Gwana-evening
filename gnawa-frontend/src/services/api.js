import axios from 'axios';
import config from '../constants/config';

const api = axios.create({
  baseURL: config.API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      return Promise.reject({
        message: error.response.data.error || 'Request failed',
        status: error.response.status,
      });
    } else if (error.request) {
      return Promise.reject({
        message: 'Network error. Please check your connection.',
        status: 0,
      });
    }
    return Promise.reject(error);
  }
);

export default api;