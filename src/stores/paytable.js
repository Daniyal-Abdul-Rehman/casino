import { defineStore } from "pinia";
import axios from "axios";

export const usePayTableStore = defineStore("payTable", {
  state: () => ({
    paytable: [], // Initial state
  }),
  getters: {
    payTables: (state) => state.paytable, // Equivalent of Vuex getter
  },
  actions: {
    // Async action to fetch paytable data
    async fetchPayTable() {
      try {
        const response = await axios.get(
          "https://dev.code-essence.eu/json/slots/?fetch=paytable"
        );
        this.paytable = response.data; // Update state directly in Pinia
      } catch (error) {
        console.error("Error fetching paytable:", error);
      }
    },
  },
});
