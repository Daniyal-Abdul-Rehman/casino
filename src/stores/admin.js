import { defineStore } from "pinia";
import { api } from 'boot/axios';

export const useAdminStore = defineStore("admin", {
  state: () => ({
    users: [], // Initial state
  }),
  getters: {
    getAllUsers: (state) => state.users, // Equivalent of Vuex getter
  },
  actions: {
    // Async action to fetch paytable data
    async getUsers() {
      try {
        const response = await api.get(
          "/users"
        );
        this.users = response.data?.results; // Update state directly in Pinia
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },
    async deleteUser(id) {
        try {
          const response = await api.delete(
            `/users/${id}`
          );
          this.users = response.data?.results; // Update state directly in Pinia
        } catch (error) {
          console.error("Error deleting users:", error);
        }
      },
  },
});
