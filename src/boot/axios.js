
import { boot } from 'quasar/wrappers';
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://backend-casino.vercel.app/v1/',  // Replace with your API base URL
  timeout: 10000,                        // Example timeout of 10 seconds
});

// Request interceptor to add the Bearer token
api.interceptors.request.use(
  (config) => {
    // Retrieve the token from localStorage, Vuex, or another storage method
    const token = localStorage.getItem('token'); // Example: Adjust this as needed

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default boot(({ app }) => {
  // For use inside Vue files (Options API) through this.$axios and this.$api
  app.config.globalProperties.$axios = axios; // Access to the main Axios instance via this.$axios
  app.config.globalProperties.$api = api;     // Access to the custom Axios instance via this.$api
});

export { api };

