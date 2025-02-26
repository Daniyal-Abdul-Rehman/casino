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
              outlined
              standout="bg-white"
              bg-color="white"
              input-class="text-dark"
              class="focus:bg-white round-6"
              label="New Password"
              type="password"
              v-model="password"
              :rules="passwordRules"
            />
            <q-input
              outlined
              standout="bg-white"
              bg-color="white"
              input-class="text-dark"
              class="focus:bg-white round-6"
              label="Confirm Password"
              type="password"
              v-model="confirmPassword"
              :rules="confirmPasswordRules"
            />
            <q-btn
              label="Change Password"
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
import { ref, watch, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../stores/auth";
import { Notify } from "quasar";

export default {
  name: "ResetPassword",
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();
    const email = ref("");
    const password = ref("");
    const confirmPassword = ref("");
    const form = ref(null);
    onMounted(() => {
      authStore.resetState();
    });
    const emailRules = [
      (val) => !!val || "Email is required",
      (val) => /.+@.+\..+/.test(val) || "Please enter a valid email",
    ];

    const passwordRules = [
      (val) => !!val || "Password is required",
      (val) => val.length >= 6 || "Password must be at least 6 characters",
    ];

    const confirmPasswordRules = [
      (val) => !!val || "Confirm password is required",
      (val) => val === password.value || "Passwords do not match",
    ];

    const handleSubmit = async () => {
      const email = localStorage.getItem("email");
      const otp = localStorage.getItem("otp");

      if (form.value.validate()) {
        await authStore.reserPassword({
          contact: email,
          otp: otp,
          newPassword: password.value,
        });
        Notify.create({
          type: !authStore.error ? "positive" : "negative",
          message: !authStore.error ? "Password Reset" : authStore.error,
          position: "top",
          timeout: 3000,
        });
        if (!authStore.error) {
          localStorage.removeItem("email");
          localStorage.removeItem("otp");
          authStore.resetState();
          router.push("/sign-in");
        }
      }
    };

    // Watch the token value in authStore
    watch(
      () => authStore.token,
      (newToken) => {
        console.log("Token changed:", newToken);
        if (newToken) {
          router.push("/");
        }
      }
    );

    return {
      email,
      password,
      confirmPassword,
      form,
      emailRules,
      passwordRules,
      confirmPasswordRules,
      handleSubmit,
    };
  },
};
</script>
  
  <style scoped>
/* Add any component-specific styles here */
</style>
  