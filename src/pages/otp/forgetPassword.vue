<template>
  <q-layout>
    <q-page-container
      class="bg-cover bg-center"
      style="
        background-image: url('/src/assets/Wallpapper_2.jpg');
        min-height: 100vh;
      "
    >
      <q-page class="flex justify-center items-center min-h-screen px-5">
        <div class="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
          <div class="text-center mb-6">
            <h1 class="text-2xl font-bold text-gray-800">CASINO OF HINDUISM</h1>
          </div>
          <q-form @submit.prevent="handleSubmit" ref="form">
            <q-input
              filled
              type="text"
              class="mb-4"
              label="Enter E-Mail"
              v-model="email"
              :rules="emailRules"
            />
            <q-btn
              label="Send Otp"
              class="w-full bg-blue-500 hover:bg-blue-600 text-white rounded"
              type="submit"
            />
          </q-form>
          <div class="text-center mt-4">
            <p class="text-gray-600">
              <a href="/login" class="text-green-600 font-bold"
                >Remember Password?</a
              >
            </p>
          </div>
          <div class="text-center mt-4">
            <p class="text-gray-600">
              Don't have an account?
              <a href="/register/step-one" class="text-green-600 font-bold"
                >Register</a
              >
            </p>
          </div>
        </div>
        <Footer />
      </q-page>
    </q-page-container>
  </q-layout>
</template>
 <script>
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../stores/auth";
import { Notify } from "quasar";

export default {
  name: "Forget",
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();
    const email = ref("");
    const form = ref(null);
    onMounted(() => {
      authStore.resetState();
    });
    const emailRules = [
      (val) => !!val || "Email is required",
      (val) => /.+@.+\..+/.test(val) || "Please enter a valid email",
    ];
    const handleSubmit = async () => {
      if (form.value.validate()) {
        await authStore.sendOtp({ contact: email.value, type: "email" });
        Notify.create({
          type: !authStore.error ? "positive" : "negative",
          message: !authStore.error ? "Otp sent Successfully" : authStore.error,
          position: "top",
          timeout: 3000,
        });
        console.log('!authStore',authStore.error)
        if (!authStore.error) {
          localStorage.setItem("email", email.value);
          router.push("/verify-otp");
        }
      }
    };

    return {
      email,
      form,
      emailRules,
      handleSubmit,
    };
  },
};
</script>
 
 <style scoped>
/* Add any component-specific styles here */
</style>