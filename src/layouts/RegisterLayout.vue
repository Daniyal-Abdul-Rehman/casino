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
      <footer class="mt-8 bg-green-900 text-white text-sm py-4 px-6">
        <p>Casino of Hinduism Pvt Ltd</p>
        <p class="mt-2">
          Copyright © 2024 Casino of Hinduism Pvt Ltd, 61, 6th Cross Rd, near
          Balaji Theatre, Tavarekere, Balaji Nagar, Bengaluru, Karnataka 560029,
          India. All rights reserved. Gaming can be addictive. Don't let it get
          that far - talk to us! In accordance with legal requirements, our
          gaming platform is only available to users aged 18 and above.
        </p>
        <div class="flex flex-wrap items-center justify-center mt-4 space-x-4">
          <a href="#" class="hover:underline">FAQ</a>
          <a href="#" class="hover:underline">About Us</a>
          <a href="#" class="hover:underline">Contact Us</a>
          <a href="#" class="hover:underline">T&C</a>
          <a href="#" class="hover:underline">Data Protection Policy</a>
          <a href="#" class="hover:underline">Cookie Policy</a>
          <a href="#" class="hover:underline">Responsible Gambling</a>
          <a href="#" class="hover:underline">Open Positions</a>
        </div>
      </footer>
    </div>
  </q-layout>
</template>
  
  <script>
export default {
  methods: {
    submitForm() {
      // Handle form submission logic here
      console.log("Form submitted");
    },
  },
};
</script>
  
  <style>
/* Additional custom styles if needed */
</style>
  