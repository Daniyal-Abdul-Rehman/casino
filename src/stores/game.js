import { defineStore } from "pinia";
import { api } from 'boot/axios';

export const useGame = defineStore("game", {
  state: () => ({
    games: [], // Initial state
  }),
  getters: {
    getGame: (state) => state.paytable, // Equivalent of Vuex getter
  },
  actions: {
    // Async action to fetch paytable data
    async getGames() {
      try {
        const response = await api.get(
          "/games"
        );
        this.games = response.data; // Update state directly in Pinia
      } catch (error) {
        console.error("Error fetching paytable:", error);
      }
    },
  },
});
