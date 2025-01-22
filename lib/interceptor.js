import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  // other configurations
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log('Call the refresh token API here');
      // Handle 401 error, e.g., redirect to login or refresh token
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
