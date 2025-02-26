<template>
  <q-layout>
    <q-page-container>
      <q-page class="bg-green-800 min-h-screen">
        <!-- Header -->

        <Header />
        <!-- Carousel -->
        <div class="w-full">
          <div
            swipeable
            animated
            class="text-center h-[500px] flex items-end justify-center"
            style="
              background-image: url('/src/assets/Wallpapper_3.jpg');
              background-size: cover;
              background-position: center;
            "
          >
            <div class="text-white text-4xl font-bold py-20">
              LET'S PLAY AND WIN THE
              <span class="text-yellow-500">JACKPOT!</span>
              <p class="text-lg mt-2">
                UP TO <span class="text-yellow-500">1,500,000 ₹</span>
              </p>
            </div>
          </div>
        </div>

        <!-- Top Games Section -->
        <section class="p-4 h-screen overflow-auto">
          <h2 class="text-white text-xl font-bold mb-4">TOP GAMES</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div
              v-for="game in games"
              :key="game.id"
              class="bg-green-700 rounded-lg shadow-lg overflow-hidden text-center"
            >
              <img
                v-if="game.images.length > 0"
                :src="game.images[0]"
                :alt="`Image of ${game.name}`"
                class="w-full h-40 object-cover"
              />
              <div class="p-2">
                <div class="flex justify-center gap-1 text-yellow-500 mb-2">
                  <q-icon v-for="i in 5" :key="i" name="star" />
                </div>
                <q-btn
                  @click="
                    $router.push({ path: '/game', query: { id: game.id } })
                  "
                  label="START"
                  class="bg-blue-500 hover:bg-blue-600 text-white w-full"
                />
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref, onMounted } from "vue";
import Footer from "../../components/footer.vue";
import { useGame } from "../../stores/game";
import Header from "../../components/header.vue";
export default {
  name: "CasinoPage",
  components: {
    Header,
    Footer,
  },
  setup() {
    const gameStore = useGame();
    const games = ref([]);

    // Fetch the games when the component is mounted
    onMounted(async () => {
      try {
        await gameStore.getGames();
        games.value = gameStore.games?.results;
        console.log(games.value);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    });

    // Return reactive data to template
    return {
      games,
    };
  },
};
</script>

<style scoped>
header {
  font-size: 1rem; /* Tailwind text-lg */
}

.q-carousel-slide {
  background-size: cover;
  background-position: center;
}

h2 {
  font-size: 1.25rem; /* Tailwind text-xl */
}
</style>
