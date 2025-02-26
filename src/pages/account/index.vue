<template>
  <q-page-container>
    <q-page>
      <!-- Navigation Options -->
      <section class="bg-white text-green-900 py-4">
        <ul class="space-y-4">
          <li class="flex items-center px-6 py-2 border-b border-green-300">
            <q-icon name="account_circle" size="20px" class="mr-2" />
            <a href="/account/details">PLAYER ACCOUNT</a>
          </li>
          <li class="flex items-center px-6 py-2 border-b border-green-300">
            <q-icon name="check_circle" size="20px" class="mr-2" />
            <span>PLAYER ACCOUNT VERIFICATION</span>
          </li>
          <li class="flex items-center px-6 py-2 border-b border-green-300">
            <q-icon name="credit_card" size="20px" class="mr-2" />
            <span>DEPOSIT MONEY</span>
          </li>
          <li class="flex items-center px-6 py-2 border-b border-green-300">
            <q-icon name="money_off" size="20px" class="mr-2" />
            <span>PAY OUT MORE MONEY</span>
          </li>
          <li class="flex items-center px-6 py-2 border-b border-green-300">
            <q-icon name="arrow_upward" size="20px" class="mr-2" />
            <span>LIMITS</span>
          </li>
          <li class="flex items-center px-6 py-2 cursor-pointer" @click="logout">
            <q-icon name="power_settings_new" size="20px" class="mr-2" />
            <span>LOGOUT</span>
          </li>
        </ul>
      </section>
    </q-page>
  </q-page-container>
</template>
  

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();

const logout=()=>{
  localStorage.removeItem('token')
 router.push('/login')
}
</script>

<style>
</style>