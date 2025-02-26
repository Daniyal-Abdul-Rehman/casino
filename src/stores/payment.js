import { defineStore } from "pinia";
import { api } from 'boot/axios';

export const usePaymentStore = defineStore("payment", {
  state: () => ({
    payment: [], // Initial state
    error:''
  }),
  getters: {
    payments: (state) => state.payment, // Equivalent of Vuex getter
  },
  actions: {
    // Async action to fetch paytable data
    async createPayment(payload) {
      console.log(payload)
      try {
        const response = await api.post(
          "/payment", payload
        );
        this.payment = response.data; // Update state directly in Pinia
      } catch (error) {
        console.error("Error fetching paytable:", error);
      }
    },
    async withdrawFunds(payload) {
      console.log(payload)
      try {
        const response = await api.post(
          "/payment/withdraw", payload
        );
        this.payment = response.data; // Update state directly in Pinia
      } catch (error) {
        this.error=error
        console.error("Error fetching paytable:", error);
      }
    },
  },
});
