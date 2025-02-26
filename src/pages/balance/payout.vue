<template>
  <div class="flex justify-center">
    <section class="p-4 lg:w-1/2 w-full">
      <div class="bg-white text-black rounded-lg shadow-lg p-6">
        <!-- Modal Header -->
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-bold">PAYOUT</h3>
          <q-icon name="close" class="cursor-pointer" />
        </div>

        <!-- Important Information -->
        <div class="text-sm mb-4">
          <p class="font-bold">Important information</p>
          <ul class="list-disc pl-6 text-gray-700">
            <li>A payout of less than 50 USD is not possible.</li>
            <li>
              Payouts will only be made once your player and bank account have
              been verified.
            </li>
          </ul>
        </div>

        <!-- Amount Section -->
        <q-card class="q-pa-md">
          <q-card-section>
            <q-input
              v-model="amount"
              label="Amount to Withdraw"
              filled
              type="number"
            />
          </q-card-section>
        </q-card>
        <!-- Credit and Payable Amount Section -->
        <div class="border rounded-lg p-4 bg-gray-50 mb-4">
          <div class="flex justify-between items-center mb-2">
            <span class="text-gray-600">Credit balance</span>
            <span class="font-bold">{{ balance }} USD</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-gray-600">Payable amount</span>
            <span class="font-bold">{{ balance }} USD</span>
          </div>
        </div>

        <!-- Further Button -->
        <div class="text-center">
          <q-btn
            flat
            @click="saveAmount"
            label="FURTHER 1/2"
            class="bg-green-700 text-white font-bold uppercase w-full py-3"
            to="/balance/account-details"
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
const amount = ref("");
const saveAmount = () => {
  localStorage.setItem("amount", amount.value);
};
onMounted(async () => {
  localStorage.removeItem("amount");
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
