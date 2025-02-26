<template>
  <div class="flex justify-center">
    <section class="p-4 lg:w-1/2 w-full">
      <div class="bg-white text-black rounded-lg shadow-lg p-6">
        <!-- Modal Header -->
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-bold">Payout</h3>
          <q-icon name="close" class="cursor-pointer" />
        </div>

        <!-- Payment Option -->
        <div class="text-center my-4">
          <p class="text-red-500 font-bold">Account Details</p>
          <q-input
            v-model="accountHolderName"
            label="Account Holder Name"
            filled
          />
          <q-input
            v-model="routingNumber"
            label="Routing Number"
            filled
            type="text"
          />
          <q-input
            v-model="accountNumber"
            label="Account Number"
            filled
            type="text"
          />
        </div>

        <!-- Further Button -->
        <div class="text-center">
          <q-btn
            @click="saveBankAccount"
            flat
            label="FURTHER 3/3"
            class="bg-green-700 text-white font-bold uppercase w-full py-3"
          />
        </div>
      </div>
    </section>
  </div>
</template>
  
  <script setup>
import { ref } from "vue";
import { loadStripe } from "@stripe/stripe-js";
import { useQuasar } from "quasar";
import axios from "axios";
import { usePaymentStore } from "../../stores/payment";

const $q = useQuasar();
const paymentStore = usePaymentStore();

const accountHolderName = ref("");
const routingNumber = ref("");
const accountNumber = ref("");

const saveBankAccount = async () => {
  const stripe = await loadStripe(
    "pk_test_51Prp1mP6sejyhIpTnsDKkuhPiJK9soE8rTmp39GNeoWaIryjhsgJ2dTE4rbBOI492k94e7luhQCd7frfQPwRkHv000PR4g4HU5"
  ); // Replace with your Stripe public key

  const { token, error } = await stripe.createToken("bank_account", {
    country: "US",
    currency: "usd",
    account_holder_name: accountHolderName.value,
    account_holder_type: "individual",
    routing_number: routingNumber.value,
    account_number: accountNumber.value,
  });

  if (error) {
    $q.notify({ message: "Error: " + error.message, color: "red" });
  } else {
    // Send token.id (bankAccountId) to backend to save in database
    const userId = localStorage.getItem("userId");
    const amount = localStorage.getItem("amount");
    const response = await paymentStore.withdrawFunds({
      bankAccountId: token.id,
      userId: userId,
      amount: amount,
    });
    if (response && response.success) {
      $q.notify({ message: "Payout successful!", color: "green" });
    } else {
      throw new Error(response?.message || "Unknown error occurred.");
    }
  }
};
</script>
  
  <style>
</style>