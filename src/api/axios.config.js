import axios from 'axios';

const API_BASE_URL=import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1';

const apiClient = axios.create({
    baseURL:API_BASE_URL,
    timeout: 10000,
    headers:{
        'Content-Type' : 'application/json',
    },
});
// token to request
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');
        if(token){
            config.headers.Authorization= `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

//Handling errors globally
apiClient.interceptors.response.use(
    (response) => response, 
    (error) => {
        if(error.response?.status == 401){
            localStorage.removeItem('authToken');
            localStorage.removeItem('user');
            window.location.href = '/';
        }
        return Promise.reject(error);
    }
);

export default apiClient;