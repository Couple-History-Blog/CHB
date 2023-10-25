/**
 * axios setup to use mock service
 */

import axios from 'axios';
import { BASE_PATH } from '../config';

const axiosServices = axios.create({ baseURL: (process.env.REACT_APP_API_URL || 'http://localhost:18830') + BASE_PATH});

// interceptor for http
axiosServices.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject((error.response && error.response.data) || 'Wrong Services')
);

export default axiosServices;
