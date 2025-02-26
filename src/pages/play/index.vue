<template>
    
  </template>
  
  <script>
  import { ref } from 'vue';
  import axios from 'axios';
  
  export default {
    name: 'SlotMachine',
    setup() {
      const winRate = ref(50);
      const lines = ref(1);
      const spinResult = ref(null);
  
      const handleSpin = async () => {
        try {
          const response = await axios.post('http://localhost:5000/spin', {
            winRate: winRate.value,
            lines: lines.value,
          });
          spinResult.value = response.data;
        } catch (error) {
          console.error('Error during spin:', error);
        }
      };
  
      return { winRate, lines, spinResult, handleSpin };
    },
  };
  </script>
  
  <style scoped>
  .controls label {
    margin-bottom: 0.5rem;
  }
  </style>
  