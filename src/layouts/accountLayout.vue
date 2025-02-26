<template>
  <q-layout class="bg-green-100 text-black min-h-screen">
    <Header/>
    <!-- <header
      class="flex items-center justify-between px-4 py-2 bg-green-900 text-white"
    >
      <h1 class="text-lg font-bold">CASINO OF HINDUISM</h1>
      <div class="flex items-center gap-2">
        <q-btn flat label="500 ₹" class="bg-white text-black font-bold" />
        <q-icon name="account_circle" size="24px" class="text-white" />
      </div>
    </header> -->

    <!-- Banner -->
    <div
      class="relative bg-cover bg-center py-20 text-center text-white"
      style="background-image: url('/src/assets/Wallpapper_1.jpg')"
    >
      <h2 class="text-lg font-bold">
        NOW'S YOUR CHANCE TO HIT THE
        <span class="text-yellow-400">JACKPOT!</span>
      </h2>
      <p class="text-3xl font-extrabold">UP TO 1`500`000 ₹</p>
    </div>

    <!-- Navigation Options -->
    <router-view />

    <!-- Footer -->
    <Footer />
  </q-layout>
</template>

<script>
import Footer from "src/components/footer.vue";
import Header from "src/components/header.vue";
export default {
  components: {
    Footer,
    Header
  },
};
</script>

<style>
</style>  