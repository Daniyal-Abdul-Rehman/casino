<template>
  <q-page-container class="w-full flex justify-center">
    <div class="bg-green-800 p-6 rounded-lg shadow-lg w-full max-w-md">
      <form @submit.prevent="submitForm">
        <div class="mb-4">
          <label class="block text-left text-sm font-medium mb-2">Player name</label>
          <q-input
            v-model="formData.playerName"
            outlined
            clearable
            :rules="[(val) => !!val || 'Player name is required.']"
            class="w-full"
          />
        </div>
        <div class="mb-4">
          <label class="block text-left text-sm font-medium mb-2">Password</label>
          <q-input
            v-model="formData.password"
            type="password"
            outlined
            clearable
            :rules="[(val) => !!val || 'Password is required.']"
            class="w-full"
          />
        </div>
        <div class="mb-6">
          <label class="block text-left text-sm font-medium mb-2">Repeat Password</label>
          <q-input
            v-model="formData.repeatPassword"
            type="password"
            outlined
            clearable
            :rules="[(val) => val === formData.password || 'Passwords must match.']"
            class="w-full"
          />
        </div>
        <p class="text-white font-semibold">
          Set a daily or monthly limit. You can adjust this at any time in your player profile under ‘Limits’.
        </p>
        <div class="bg-green-700 p-5 rounded-lg">
          <p class="text-white">Limit</p>
          <div class="grid grid-cols-2 space-x-5">
            <q-select
              v-model="formData.dailyLimit"
              outlined
              :options="[...Array(31).keys()].map((x) => x + 1)"
              label="Select Day"
              :rules="[(val) => !!val || 'Daily limit is required.']"
              class="w-full"
            />
            <q-select
              v-model="formData.monthlyLimit"
              outlined
              :options="months"
              label="Select Month"
              :rules="[(val) => !!val || 'Monthly limit is required.']"
              class="w-full"
            />
          </div>
          <q-input
            v-model="formData.amount"
            outlined
            placeholder="Type Amount"
            class="w-full mt-4"
            :rules="[(val) => !!val || 'Amount is required.']"
          />
        </div>
        <div class="mb-6 flex items-center pt-4">
          <q-checkbox
            v-model="formData.confirmDetails"
            :rules="[(val) => val || 'You must confirm your details.']"
            label="I confirm: All details are correct and I have not been banned from playing."
            color="white"
          />
        </div>
        <div class="mb-6 flex items-center">
          <q-checkbox
            v-model="formData.confirmOwnership"
            :rules="[(val) => val || 'You must confirm account ownership.']"
            label="I confirm: I am the beneficial owner of the player account."
            color="white"
          />
        </div>
        <div class="mb-6 flex items-center">
          <q-checkbox
            v-model="formData.confirmTnC"
            :rules="[(val) => val || 'You must accept the T&C and Data Protection Policy.']"
            label="I confirm: T&C and Data Protection Policy"
            color="white"
          />
        </div>
        <q-btn type="submit" color="primary" unelevated class="w-full py-2">
          Start
        </q-btn>
      </form>
    </div>
  </q-page-container>
</template>

<script>
import { ref } from "vue";
import { useAuthStore } from "../../stores/auth";
import { useRouter } from "vue-router";
import { QInput, QCheckbox, QBtn, QSelect } from "quasar";
import { Notify } from "quasar";

export default {
  components: { QInput, QCheckbox, QBtn, QSelect },
  setup() {
    const router = useRouter();
    const authStore = useAuthStore();
    const formData = ref({
      playerName: "",
      password: "",
      repeatPassword: "",
      dailyLimit: "",
      monthlyLimit: "",
      amount: "",
      confirmDetails: false,
      confirmOwnership: false,
      confirmTnC: false,
    });

    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const submitForm = async () => {
      const isValid =
        formData.value.playerName &&
        formData.value.password &&
        formData.value.repeatPassword === formData.value.password &&
        formData.value.dailyLimit &&
        formData.value.monthlyLimit &&
        formData.value.amount &&
        formData.value.confirmDetails &&
        formData.value.confirmOwnership &&
        formData.value.confirmTnC;

      if (isValid) {
        const first = JSON.parse(localStorage.getItem("formData") || "{}");
        const second = JSON.parse(
          localStorage.getItem("formDataStep2") || "{}"
        );
        const finalData = { ...first, ...second, ...formData.value };

        authStore.isLoading = true;
        await authStore.register(finalData);

        Notify.create({
          type: !authStore.error ? "positive" : "negative",
          message: !authStore.error
            ? "Account Created Successfully"
            : authStore?.error,
          position: "top",
          timeout: 3000,
        });

        if (!authStore.error) {
          router.push("/login");
        }
      } else {
        alert("Please fill out all required fields correctly.");
      }
    };

    return {
      formData,
      months,
      submitForm,
    };
  },
};
</script>

<style scoped>
.w-full {
  width: 100%;
}
</style>
