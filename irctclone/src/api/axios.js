import axios from 'axios';
import getCSRFToken from '../utils/csrf';

const instance = axios.create({
    baseURL: 'http://localhost:8000/',
});

instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        const csrfToken = getCSRFToken();

        if (token) {
            config.headers['Authorization'] = `Token ${token}`; // or `Token ${token}` depending on your backend
        }

        if (csrfToken) {
            config.headers['X-CSRFToken'] = csrfToken;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (response) => {
        // Handle successful responses here
        return response;
    },
    (error) => {
        if (error.response) {
            // Handle error responses globally
            if (error.response.status === 401) {
                // Handle unauthorized errors
                console.error('Unauthorized access - perhaps redirect to login?');
            } else if (error.response.status === 403) {
                // Handle forbidden errors
                console.error('Access forbidden - CSRF token missing or invalid');
            } else {
                console.error(`Error ${error.response.status}: ${error.response.data}`);
            }
        } else {
            console.error('Error:', error.message);
        }

        return Promise.reject(error);
    }
);

export default instance;
