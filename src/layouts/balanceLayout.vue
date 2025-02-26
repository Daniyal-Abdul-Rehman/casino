<template>
  <q-layout>
    <q-page-container>
      <q-page class="bg-green-800 min-h-screen text-white">
        <!-- Header -->
        <Header />

        <!-- Banner -->
        <div
          class="relative bg-cover bg-center py-20 text-center h-[300px]"
          style="background-image: url('/src/assets/Wallpapper_1.jpg')"
        >
          <h2 class="text-lg font-bold">MY BALANCE</h2>
        </div>

        <!-- Balance Modal -->
        <div class="h-screen overflow-scroll">
          <router-view />
        </div>
        <Footer />
      </q-page>
    </q-page-container>
  </q-layout>
</template>
    
  
  <script>
import Footer from "src/components/footer.vue";
import Header from "src/components/header.vue";

export default {
  components: { Footer, Header },
  methods: {
    closeBalance() {
      // Add logic to close the modal if needed
    },
  },
};
</script>
  
  
  <style scoped>
.bg-cover {
  background-size: cover;
  background-position: center;
}
.shadow-lg {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
  