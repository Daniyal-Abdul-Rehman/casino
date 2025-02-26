<template>
  <q-layout>
    <q-page-container class="!pt-0 !pb-0">
      <q-page class="casino-page">
        <!-- Header -->
        <q-header
          class="!bg-transparent text-white flex justify-between items-center px-2 py-3"
        >
          <h1 class="text-lg font-bold uppercase">Casino of Hinduism</h1>
          <div>
            <q-btn flat label="Sign In" class="mr-2" to="/login" />
            <q-btn label="Register" color="secondary" to="/register/step-one" />
          </div>
        </q-header>

        <!-- Main Banner -->
        <div
          class="main-banner bg-cover object-top bg-center text-center py-7 px-4 relative"
          style="background-image: url('../../assets/Wallpaper_2.jpg')"
        >
          <q-img
            src="../../assets/Wallpapper_2.jpg"
            class="absolute top-0 left-0 w-full h-full object-cover"
            style="z-index: -1"
          />
          <div class="relative z-[999] pt-12">
            <h2 class="text-xl text-yellow-500 font-bold">JACKPOT</h2>
            <p class="text-4xl font-bold text-white">1'500'000₹</p>
            <p class="text-lg text-gray-100 mt-2">
              Up to <span class="text-green-400 font-bold">1 000 ₹ Bonus</span> +15
              free spins
            </p>
          </div>
        </div>

        <!-- Features Section -->
        <div class="features-section bg-gray-100 px-6 py-10">
          <div class="feature mb-8">
            <h3 class="text-lg font-bold mb-2">SAFE ONLINE GAMING</h3>
            <p class="text-gray-700">
              We support you in responsible gaming with self-control options and a
              dedicated department that takes care of your player protection.
              Contact us at
              <span class="text-blue-500">gamesafe@casino-of-hinduism.com</span> for
              assistance.
            </p>
          </div>
          <div class="border-t border-gray-300 my-6"></div>
          <div class="feature mb-8">
            <h3 class="text-lg font-bold mb-2">TOP-PROMOTIONS</h3>
            <p class="text-gray-700">
              Varied bonus offers, ranking games, and promotions: you're in for a
              surprise!
            </p>
          </div>
          <div class="border-t border-gray-300 my-6"></div>
          <div class="feature mb-8">
            <h3 class="text-lg font-bold mb-2">MALTA GAMES LICENSE</h3>
            <p class="text-gray-700">
              Casino of Hinduism is under the supervision and control of the State
              Gaming Commission. Your security is our top priority.
            </p>
          </div>
        </div>

        <!-- Contact Section -->
        <div class="contact-section bg-white px-6 py-10 text-gray-800">
          <h3 class="text-lg font-bold mb-4">GET IN TOUCH WITH OUR TEAM</h3>
          <p class="flex items-center mb-4">
            <q-icon name="phone" color="primary" class="mr-2" /> +356 796 3 98 72
          </p>
          <p class="flex items-center mb-4">
            <q-icon name="email" color="primary" class="mr-2" />
            gamesafe@casino-of-hinduism.com
          </p>
          <p>
            You can reach us daily from 9 am to 8 pm by phone or chat (English and
            Hindi), or anytime by email.
          </p>
        </div>

        <!-- Footer -->
        <q-footer class="bg-primary text-white px-4 py-4 text-center">
          <div>
            <p>Casino of Hinduism</p>
            <p class="text-sm">
              Copyright © 2024 Casino of Hinduism Ltd., Malta. All rights reserved.
              Gaming can be addictive. Please gamble responsibly.
            </p>
            <div class="flex justify-center items-center mt-4 space-x-4">
              <q-icon name="credit_card" size="lg" color="white" />
              <q-icon name="payment" size="lg" color="white" />
            </div>
          </div>
        </q-footer>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const navigateToSignIn = () => {
  router.push("/sign-in");
};
</script>

<style scoped>
.main-banner {
  background-image: url("../../assets/hunuman.jpg");
  background-size: cover;
  background-position: center;
}

.casino-page {
  font-family: "Arial", sans-serif;
}
</style>
