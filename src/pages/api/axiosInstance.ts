import axios from 'axios';
import { getCookieValue } from './useCookie';

const axiosInstance = axios.create({
  headers: {
    'X-Auth-Token': '',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    config.headers['X-Auth-Token'] = getCookieValue('authToken');
    return config;
  },
  (err) => {
    return Promise.reject(err);
  },
);

export default axiosInstance;