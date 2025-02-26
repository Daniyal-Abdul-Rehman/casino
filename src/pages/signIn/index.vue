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
              label="Player name or E-Mail"
              v-model="email"
              :rules="emailRules"
            />
            <q-input
              filled
              type="password"
              class="mb-4"
              label="Password"
              v-model="password"
              :rules="passwordRules"
            />
            <q-checkbox
              v-model="saveAccessData"
              label="Save access data"
              class="mb-4 text-gray-600"
            />
            <q-btn
              label="Login"
              class="w-full bg-blue-500 hover:bg-blue-600 text-white rounded"
             type="submit"
            />
          </q-form>
          <div class="text-center mt-4">
            <p class="text-gray-600">
              <a href="/forget-password" class="text-green-600 font-bold"
                >Forget Password?</a
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
import Footer from "../../components/footer.vue";
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../stores/auth";
import { Notify } from "quasar";

export default {
  name: "SignInPage",
  components: {
    Footer,
  },
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();
    const email = ref("");
    const password = ref("");
    const form = ref(null);
    const emailRules = [
      (val) => !!val || "Email is required",
      (val) => /.+@.+\..+/.test(val) || "Please enter a valid email",
    ];
    const passwordRules = [
      (val) => !!val || "Password is required",
      (val) => val.length >= 6 || "Password must be at least 6 characters",
    ];

    const handleSubmit = async () => {
      if (form.value.validate()) {
        await authStore.login({ email: email.value, password: password.value });
        Notify.create({
          type: !authStore.error ? "positive" : "negative",
          message: !authStore.error ? "Login Success" : authStore.error,
          position: "top",
          timeout: 3000,
        });
        if (!authStore.error) {
          router.push("/dashboard");
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
      form,
      emailRules,
      passwordRules,
      handleSubmit,
    };
  },
};
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
