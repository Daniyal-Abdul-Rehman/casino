<template>
  <q-layout>
    <div
      class="bg-cover bg-center"
      style="
        background-image: url('/src/assets/Wallpapper1.jpg');
        min-height: 100vh;
      "
    >
      <div
        class="flex flex-col items-center justify-center text-center px-4 py-8 text-white"
      >
        <!-- Header -->
        <h1 class="text-4xl font-bold mb-4">CASINO OF HINDUISM</h1>
        <q-btn flat class="absolute top-4 right-4 text-white text-lg"
          >Login</q-btn
        >
        <p class="text-lg">Welcome to Casino of Hinduism!</p>
        <p class="mb-6">
          Start your registration now in just a few steps. <br />
          The details must match your ID.
        </p>

        <!-- Progress Bar -->
        <div class="flex items-center justify-center space-x-4 mb-8">
          <div class="flex items-center">
            <span
              class="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white"
              >➤</span
            >
            <span class="ml-2 font-medium">Let's Start</span>
          </div>
          <div class="w-12 h-1 bg-green-500"></div>
          <div class="flex items-center">
            <span
              class="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white"
              >●</span
            >
            <span class="ml-2 font-medium">Almost there</span>
          </div>
          <div class="w-12 h-1 bg-gray-400"></div>
          <div class="flex items-center">
            <span
              class="w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center text-white"
              >➤</span
            >
            <span class="ml-2 font-medium">Finish</span>
          </div>
        </div>
      </div>
      <div class="flex justify-center">
        <!-- Form -->
        <router-view></router-view>
      </div>
      <!-- Footer -->
     <footer/>
    </div>
  </q-layout>
</template>
  
<script setup>
import footer from 'src/components/footer.vue';
</script>
  
  <style>
/* Additional custom styles if needed */
</style>
  