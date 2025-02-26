<template>
  <div>
    <header
      class="flex items-center justify-between px-4 py-2 bg-green-900 text-white"
    >
      <h1 class="text-lg font-bold cursor-pointer" @click="$router.push('/dashboard')">
        CASINO OF HINDUISM
      </h1>
      <div class="flex items-center gap-2">
        <q-btn
          v-if="userId"
          flat
          :label="`${balance} USD`"
          class="bg-white text-black font-bold"
          to="/balance"
        />
        <q-btn v-if="userId" to="/account">
          <q-icon name="account_circle" size="24px" class="text-white" />
        </q-btn>
        <q-btn v-else to="/login" class="bg-white text-black font-bold">
          Login
        </q-btn>
      </div>
    </header>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useUserStore } from "src/stores/user";

const userStore = useUserStore();
const balance = ref(0);
const userId = ref(null);

onMounted(async () => {
  userId.value = localStorage.getItem("userId");
  if (userId.value) {
    await userStore.getUserById(userId.value);
    balance.value = userStore.user.balance;
  }
});
</script>

<style>
</style>
