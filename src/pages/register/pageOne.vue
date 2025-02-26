<template>
  <q-page-container class="w-full flex justify-center">
    <div class="bg-green-800 p-6 rounded-lg shadow-lg w-full max-w-md">
      <form @submit.prevent="submitForm">
        <div class="mb-4">
          <label class="block text-left text-sm font-medium mb-2">First name</label>
          <q-input
            v-model="formData.firstName"
            outlined
            clearable
            :rules="[val => !!val || 'First name is required.']"
            class="w-full"
          />
        </div>
        <div class="mb-4">
          <label class="block text-left text-sm font-medium mb-2">Surname</label>
          <q-input
            v-model="formData.surname"
            outlined
            clearable
            :rules="[val => !!val || 'Surname is required.']"
            class="w-full"
          />
        </div>
        <div class="mb-6">
          <label class="block text-left text-sm font-medium mb-2">Date of birth</label>
          <q-input
            v-model="formData.dateOfBirth"
            outlined
            clearable
            :rules="[val => /^\d{2}\/\d{2}\/\d{4}$/.test(val) || 'Date must be in DD/MM/YYYY format.']"
            placeholder="DD/MM/YYYY"
            class="w-full"
          />
        </div>
        <q-btn type="submit" color="primary" unelevated class="w-full py-2">
          Next
        </q-btn>
      </form>
    </div>
  </q-page-container>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { QInput, QBtn } from "quasar";

export default {
  components: { QInput, QBtn },
  setup() {
    const router = useRouter();

    const formData = ref({
      firstName: "",
      surname: "",
      dateOfBirth: "",
    });

    const submitForm = () => {
      const isValid =
        formData.value.firstName &&
        formData.value.surname &&
        /^\d{2}\/\d{2}\/\d{4}$/.test(formData.value.dateOfBirth);

      if (isValid) {
        // Save data to localStorage
        localStorage.setItem("formData", JSON.stringify(formData.value));
        
        // Navigate to the next route
        router.push("/register/step-two");
      } else {
        alert("Please fill out all fields correctly.");
      }
    };

    onMounted(() => {
      const savedData = localStorage.getItem("formData");
      if (savedData) {
        localStorage.removeItem("formData");
        formData.value = { firstName: "", surname: "", dateOfBirth: "" };
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
