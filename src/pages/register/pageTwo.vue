<template>
  <q-page-container class="w-full flex justify-center">
    <div class="bg-green-800 p-6 rounded-lg shadow-lg w-full max-w-md">
      <form @submit.prevent="submitForm">
        <div class="mb-4">
          <label class="block text-left text-sm font-medium mb-2">Street name</label>
          <q-input
            v-model="formData.streetName"
            outlined
            clearable
            :rules="[val => !!val || 'Street name is required.']"
            class="w-full"
          />
        </div>
        <div class="mb-4">
          <label class="block text-left text-sm font-medium mb-2">Phone No</label>
          <q-input
            v-model="formData.phone"
            outlined
            clearable
            :rules="[val => /^[0-9]+$/.test(val) || 'Phone number must be valid.']"
            class="w-full"
          />
        </div>
        <div class="mb-6">
          <label class="block text-left text-sm font-medium mb-2">Email</label>
          <q-input
            v-model="formData.email"
            outlined
            clearable
            :rules="[val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || 'Email must be valid.']"
            class="w-full"
          />
        </div>
        <div class="mb-6 flex items-center">
          <q-checkbox
            v-model="formData.informSms"
            label="Yes, I would like to be informed about news by SMS."
            color="white"
          />
        </div>
        <div class="mb-6 flex items-center">
          <q-checkbox
            v-model="formData.subscribeNewsletter"
            label="Yes, I would like to subscribe to the newsletter."
            color="white"
          />
        </div>
        <q-btn type="submit" color="primary" unelevated class="w-full py-2">
          Let's Go
        </q-btn>
      </form>
    </div>
  </q-page-container>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { QInput, QBtn, QCheckbox } from "quasar";

export default {
  components: { QInput, QBtn, QCheckbox },
  setup() {
    const router = useRouter();

    const formData = ref({
      streetName: "",
      phone: "",
      email: "",
      informSms: false,
      subscribeNewsletter: false,
    });

    const submitForm = () => {
      const isValid =
        formData.value.streetName &&
        /^[0-9]+$/.test(formData.value.phone) &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.value.email);

      if (isValid) {
        // Save data to localStorage
        localStorage.setItem("formDataStep2", JSON.stringify(formData.value));

        // Navigate to the next route
        router.push("/register/step-three");
      } else {
        alert("Please fill out all fields correctly.");
      }
    };

    onMounted(() => {
      const savedData = localStorage.getItem("formDataStep2");
      if (savedData) {
        localStorage.removeItem("formDataStep2");
        formData.value = {
          streetName: "",
          phone: "",
          email: "",
          informSms: false,
          subscribeNewsletter: false,
        };
      }
    });

    return {
      formData,
      submitForm,
    };
  },
};
</script>

<style>
.text-red-500 {
  color: #f56565;
}
</style>
