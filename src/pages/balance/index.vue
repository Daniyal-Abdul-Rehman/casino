<template>
  <div>
    <section class="p-4 flex justify-center">
      <div class="bg-white text-black rounded-lg shadow-lg p-6 lg:w-1/2 w-full">
        <!-- Modal Header -->
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-bold">MY BALANCE</h3>

          <q-btn
            to="/balance/add"
            flat
            label="Add Balance"
            class="bg-green-700 text-white font-bold uppercase py-3"
          />
        </div>

        <!-- Playable Money Section -->
        <div class="text-lg mb-6">
          <div class="flex justify-between items-center">
            <span>Playable money</span>
            <span class="font-bold">{{ balance }} USD</span>
          </div>
        </div>

        <!-- Payable Money Section -->
        <div
          class="border rounded-lg p-4 flex justify-between items-center bg-gray-50 cursor-pointer"
          @click="$router.push('/balance/payout')"
        >
          <div>
            <p class="font-bold">Payable money</p>
            <p class="text-sm text-gray-600">Can be paid out at any time.</p>
          </div>
          <div class="flex items-center gap-2">
            <span class="font-bold">{{ balance }} USD</span>
            <q-icon name="chevron_right" />
          </div>
        </div>

        <!-- To Deposit Button -->
        <div class="mt-6 text-center">
          <q-btn
            to="/balance/payout"
            flat
            label="TO DEPOSIT"
            class="bg-green-700 text-white font-bold uppercase w-full py-3"
          />
        </div>
      </div>
    </section>
  </div>
</template>
  

<script setup>
import { onMounted, ref } from "vue";
import { useUserStore } from "src/stores/user";
const userStore = useUserStore();
const balance = ref(0);
onMounted(async () => {
  const userId = localStorage.getItem("userId");
  await userStore.getUserById(userId);
  balance.value = userStore.user.balance;
});
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
