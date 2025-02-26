import { defineStore } from 'pinia';
import { api } from 'boot/axios';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        isLoading: false,
        isSendOtp: false,
        isOtpVerified: false,
        isReset: false,
        token: null,
        error: null,
        user: null
    }),
    getters: {
        isAuthenticated: (state) => !!state.token,
    },
    actions: {
        async verifyOtp(userData) {
            this.isLoading = true;
            try {
                // API call to register the user
                const response = await api.post('otp/verifyOtp', userData);
                this.isLoading = false
                // Assuming the response contains a token and user data
                this.isOtpVerified = true;
                this.error = null;  // Clear any previous errors
            } catch (error) {
                // Handle any error during registration
                this.error = error.response ? error.response.data.message : 'An error occurred';
                this.isOtpVerified = false;
                this.isLoading = false
            }
        },
        async reserPassword(userData) {
            this.isLoading = true;
            try {
                // API call to register the user
                const response = await api.post('otp/resetPassword', userData);
                this.isLoading = false
                // Assuming the response contains a token and user data
                this.isReset = true;
                this.error = null;  // Clear any previous errors
            } catch (error) {
                // Handle any error during registration
                this.error = error.response ? error.response.data.message : 'An error occurred';
                this.isReset = false;
                this.isLoading = false
            }
        },
        async resetState() {
            this.isLoading = false,
                this.isSendOtp = false,
                this.isOtpVerified = false,
                this.token = null,
                this.error = null,
                this.user = null
        },
        async sendOtp(userData) {
            this.isLoading = true;
            try {
                // API call to register the user
                const response = await api.post('otp/sendOtp', userData);
                this.isLoading = false
                // Assuming the response contains a token and user data
                this.isSendOtp = true;
                this.error = null;  // Clear any previous errors
            } catch (error) {
                // Handle any error during registration
                this.error = error.response ? error.response.data.message : 'An error occurred';
                this.isSendOtp = false;
                this.isLoading = false
            }
        },
        async register(userData) {
            this.isLoading = true;
            try {
                // API call to register the user
                const response = await api.post('auth/register', userData);
                this.isLoading = false
                // Assuming the response contains a token and user data
                this.token = response.data.token;
                this.user = response.data.user;
                this.error = null;  // Clear any previous errors
            } catch (error) {
                // Handle any error during registration
                this.error = error.response ? error.response.data.message : 'An error occurred';
                this.token = null;
                this.user = null;
                this.isLoading = false
            }
        },
        async login(userData) {
            this.isLoading = true;
            try {
                // API call to register the user
                const response = await api.post('auth/login', userData);
                this.isLoading = false
                console.log('some')
                // Assuming the response contains a token and user data
                console.log('response',response.data)
                localStorage.setItem('token',response.data.tokens.access.token)
                localStorage.setItem('userId',response.data.user.id)
                localStorage.setItem('role',response.data.user.role)
                this.token = response.data.tokens.access.token;
                this.user = response.data.user;
                this.error = null;  // Clear any previous errors
            } catch (error) {
                // Handle any error during registration
                this.error = error.response ? error.response.data.message : null;
                this.token = null;
                this.user = null;
                this.isLoading = false
            }
        }
    },
})