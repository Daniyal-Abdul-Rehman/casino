<template>
    <q-page class="flex flex-center">
      <div>
        <h1>Slot Game</h1>
        <p>Balance: {{ balance }}</p>
  
        <div class="grid">
          <div
            v-for="(symbol, index) in grid"
            :key="index"
            class="slot"
          >
            {{ symbol }}
          </div>
        </div>
  
        <q-input
          v-model="bet"
          type="number"
          label="Bet Amount"
          outlined
          class="q-my-md"
        />
  
        <q-btn label="Spin" @click="spin" color="primary" />
        <p v-if="winnings">You won: {{ winnings }}</p>
      </div>
    </q-page>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        balance: 0,
        grid: [],
        bet: 10,
        winnings: 0,
      };
    },
    methods: {
      async fetchConfig() {
        try {
          const response = await axios.get('http://localhost:3000/config');
          this.balance = response.data.balance;
        } catch (error) {
          console.error('Error fetching config:', error);
        }
      },
      async spin() {
        try {
          const response = await axios.post('http://localhost:3000/spin', {
            bet: this.bet,
            activePaylines: 5,
          });
  
          this.grid = response.data.grid;
          this.winnings = response.data.winnings;
          this.balance = response.data.balance;
        } catch (error) {
          console.error('Error during spin:', error);
        }
      },
    },
    mounted() {
      this.fetchConfig();
    },
  };
  </script>
  
  <style>
  .grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 10px;
  }
  .slot {
    border: 1px solid #ccc;
    padding: 10px;
    text-align: center;
  }
  </style>
  