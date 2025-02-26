import { defineStore } from "pinia";
import { api } from 'boot/axios';

export const useUserStore = defineStore("user", {
    state: () => ({
        user: [], // Initial state
        error: ''
    }),
    getters: {
        userGetter: (state) => state.user, // Equivalent of Vuex getter
    },
    actions: {
        // Async action to fetch paytable data
        async getUserById(id) {
            console.log(id)
            try {
                const response = await api.get(
                    `/users/${id}`
                );
                this.user = response.data; // Update state directly in Pinia
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        },
        async updateUserById(userId,payload) {
            console.log(payload)
            try {
                const response = await api.patch(
                    `/users/${userId}`, payload
                );
                this.user = response.data; // Update state directly in Pinia
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        },
    },
});
